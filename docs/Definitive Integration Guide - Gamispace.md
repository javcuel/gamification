# Universal Game Integration Guide - Gamispace

Gamispace is an educational platform that integrates subjects, users, and video games. The system is designed to be "Plug & Play" and is completely engine-agnostic. The platform handles the heavy lifting (security, databases, and persistence). Your goal is simply to connect your game to our communication bridge.

> **Important note on Copy & Paste:** We recommend using the provided source code files directly instead of copying and pasting from this document to avoid hidden line break errors.

## 1. Local Test Environment (Mock API)

Once you have implemented the steps below, you can test that your game sends and receives data without having to compile and upload the game to the platform every time. 

To safely simulate the platform locally, open the `index.html` file generated after exporting your game, and paste this code snippet wrapped in a `<script>` tag directly inside the `<head>` section. Save the file and open it in your browser:

```html
<script>
window.GamispaceAPI = {
    isPlatformReady: true,
    onPlatformReady: null,
    onProgressReceived: null,
    onPlaySaved: null,

    // Temporary database (Starting with Level 1 completed)
    mockDatabase: [{"level":1,"score":100,"time":10.5,"completed":true}],

    requestProgress: function() {
        console.log("[Mock] Progress request received.");
        setTimeout(() => {
            if (this.onProgressReceived) {
                // Return the current state of memory converted to string
                this.onProgressReceived(JSON.stringify(this.mockDatabase));
            }
        }, 500);
    },

    sendPlayData: function(level, score, time, completed) {
        console.log(`[Mock] Saving -> Level: ${level} | Score: ${score} | Completed: ${completed}`);
        
        // Search if we had already played this level in memory
        let existingPlay = this.mockDatabase.find(d => d.level === level);
        
        if (existingPlay) {
            // Update only if it's a new record or if it is now completed
            if (score > existingPlay.score) existingPlay.score = score;
            if (completed) existingPlay.completed = true;
        } else {
            // If it's a new level, add it to the database
            this.mockDatabase.push({level: level, score: score, time: time, completed: completed});
        }

        setTimeout(() => {
            if (this.onPlaySaved) {
                this.onPlaySaved(true);
            }
        }, 500);
    }
};
</script>

```

## 2. Practical Guide for Unity (WebGL)

### Step 1: The Translator (.jslib)

Create a file named `GamispacePlugin.jslib` in your project's `Assets/Plugins/WebGL/` path and paste the following code:

```javascript
mergeInto(LibraryManager.library, {
    InitializeGamispaceJS: function() {
        if (window.GamispaceAPI) {
            window.GamispaceAPI.onPlatformReady = function() {
                SendMessage('WebBridge', 'OnPlatformReady');
            };
            if (window.GamispaceAPI.isPlatformReady) {
                window.GamispaceAPI.onPlatformReady();
            }
        }
    },
    RequestProgressJS: function () {
        if (window.GamispaceAPI) {
            window.GamispaceAPI.onProgressReceived = function(json) {
                SendMessage('WebBridge', 'OnProgressReceived', json);
            };
            window.GamispaceAPI.requestProgress();
        }
    },
    SendPlayDataJS: function (level, score, time, completedStatus) {
        if (window.GamispaceAPI) {
            window.GamispaceAPI.onPlaySaved = function(success) {
                SendMessage('WebBridge', 'OnPlaySaved', success ? 1 : 0);
            };
            window.GamispaceAPI.sendPlayData(level, score, time, completedStatus === 1);
        }
    }
});

```

### Step 2: The Robust C# Manager (WebBridge.cs)

Create an empty GameObject in your first scene, name it EXACTLY `WebBridge`, and attach this script. This code includes protection against Unity's code optimization (IL2CPP) and full compatibility with the local Editor:

```csharp
using UnityEngine;
using System.Runtime.InteropServices;
using System.Collections.Generic;
using UnityEngine.Scripting; 

[Preserve]
public class WebBridge : MonoBehaviour
{
    public static WebBridge instance;

    [DllImport("__Internal")] private static extern void InitializeGamispaceJS();
    [DllImport("__Internal")] private static extern void RequestProgressJS();
    [DllImport("__Internal")] private static extern void SendPlayDataJS(int level, int score, float time, int completedStatus);

    public Dictionary<int, LevelData> progressData = new Dictionary<int, LevelData>();
    public System.Action OnDataUpdated;

    void Awake()
    {
        if (instance == null) { instance = this; DontDestroyOnLoad(gameObject); gameObject.name = "WebBridge"; }
        else { Destroy(gameObject); }
    }

    void Start()
    {
        #if UNITY_WEBGL && !UNITY_EDITOR
        InitializeGamispaceJS();
        #else
        Debug.Log("[Editor Simulation] Local mode active. Bridge ready.");
        #endif
    }

    [Preserve]
    public void OnPlatformReady()
    {
        #if UNITY_WEBGL && !UNITY_EDITOR
        RequestProgressJS();
        #endif
    }

    public void SavePlay(int level, int score, float time, bool levelCompleted)
    {
        #if UNITY_WEBGL && !UNITY_EDITOR
        SendPlayDataJS(level, score, time, levelCompleted ? 1 : 0);
        #else
        Debug.Log($"[Simulation] Level {level} saved. Score: {score} | Time: {time}s | Status: {levelCompleted}");
        #endif
    }

    [Preserve]
    public void OnProgressReceived(string jsonString)
    {
        if (jsonString == "[]" || string.IsNullOrWhiteSpace(jsonString)) { OnDataUpdated?.Invoke(); return; }
        try 
        {
            LevelData[] progress = JsonHelper.FromJson<LevelData>(jsonString);
            progressData.Clear();
            foreach (var data in progress) { progressData[data.level] = data; }
            OnDataUpdated?.Invoke();
        }
        catch (System.Exception e) { Debug.LogError("JSON Error: " + e.Message); }
    }

    [Preserve]
    public void OnPlaySaved(int successStatus) 
    {
        if (successStatus == 1) { RequestProgressJS(); }
        else { Debug.LogError("Save error: Web platform failed to process the save request."); }
    }
}

[System.Serializable]
[Preserve]
public class LevelData { public int level; public int score; public float time; public bool completed; }

[Preserve]
public static class JsonHelper {
    public static T[] FromJson<T>(string json) { return JsonUtility.FromJson<Wrapper<T>>("{ \"array\": " + json + "}").array; }
    [System.Serializable] [Preserve] private class Wrapper<T> { public T[] array; }
}

```

### Step 3: Practical Implementation Examples

**Example 1: Registering the end of a level (GameManager)**

```csharp
public class GameManager: MonoBehaviour
{
    public int currentLevel = 1;
    private float timePlayed = 0f;
    
    void Update() { timePlayed += Time.deltaTime; }
    
    public void ReachFinishLine(int scoreAchieved)
    {
        WebBridge.instance.SavePlay(currentLevel, scoreAchieved, timePlayed, true);
    }
}

```

**Example 2: Retrieving and displaying records in the Selection Menu**

```csharp
using UnityEngine;
using TMPro;

public class LevelMenuButton: MonoBehaviour
{
    public int targetLevel = 1;
    public TMP_Text recordText;
    
    void Start()
    {
        if (WebBridge.instance.progressData.ContainsKey(targetLevel))
        {
            int score = WebBridge.instance.progressData[targetLevel].score;
            recordText.text = "Record: " + score;
        }
        else
        {
            recordText.text = "Unplayed";
        }
    }
}

```

## 3. Practical Guide for Godot 4 (Web)

### Step 1: The Autoload Script (Manager)

Create a script named `WebBridge.gd` and configure it as an Autoload (Singleton) in your project settings:

```gdscript
extends Node

var progress_data = {}
var cb_ready = JavaScriptBridge.create_callback(_on_platform_ready)
var cb_progress = JavaScriptBridge.create_callback(_receive_progress)
var cb_saved = JavaScriptBridge.create_callback(_confirm_save)

func _ready():
    if OS.has_feature("web"):
        var window = JavaScriptBridge.get_interface("window")
        if window and window.GamispaceAPI:
            window.GamispaceAPI.onPlatformReady = cb_ready
            if window.GamispaceAPI.isPlatformReady:
                window.GamispaceAPI.onPlatformReady()

func _on_platform_ready(args):
    var api = JavaScriptBridge.get_interface("GamispaceAPI")
    if api:
        api.onProgressReceived = cb_progress
        api.onPlaySaved = cb_saved
        api.requestProgress()

func save_play(level: int, score: int, time: float, completed: bool):
    if OS.has_feature("web"):
        var api = JavaScriptBridge.get_interface("GamispaceAPI")
        if api:
            api.sendPlayData(level, score, time, completed)
    else:
        print("[Simulation] Level saved.")

func _receive_progress(args):
    var json = args[0]
    if json == "[]" or json == "": return
    var progress = JSON.parse_string(json)
    if typeof(progress) != TYPE_ARRAY:
        printerr("Error: Unexpected JSON format")
        return
    progress_data.clear()
    for data in progress:
        progress_data[data.level] = data

func _confirm_save(args):
    if args[0]:
        JavaScriptBridge.get_interface("GamispaceAPI").requestProgress()
    else:
        printerr("Network error: The game could not be saved.")

```

### Step 2: Practical Implementation Examples (Godot)

**Example 1: Finishing a level (Goal collision)**

```gdscript
extends Area2D

func _on_body_entered(body):
    if body.name == "Player":
        # Level 1, 500 points, 45.2s, true (Completed)
        WebBridge.save_play(1, 500, 45.2, true)

```

**Example 2: Retrieving and displaying records in a Menu (Label)**

```gdscript
extends Label
@export var target_level: int = 1

func _ready():
    await get_tree().process_frame
    if WebBridge.progress_data.has(target_level):
        var score = WebBridge.progress_data[target_level].score
        text = "Record: " + str(score)
    else:
        text = "Unplayed"

```

## 4. Other Engines (Phaser, Construct, GameMaker)

Gamispace is 100% compatible with any software capable of exporting to HTML5 (Web). Because web builds run JavaScript code natively in the browser, the flow consists solely of calling and listening to the global window object: `window.GamispaceAPI`.

**To send data:** Call the API directly using your engine's JavaScript integration layer:

* **Phaser:** `window.GamispaceAPI.sendPlayData(1, 500, 15.2, true);`

* **Construct 3:** Add the Browser system object and use the Execute Javascript action to invoke the same instruction.


* **GameMaker Studio:** Declare a simple JS web extension with a bridge function that calls the native object.



**To receive data:** Implement this event subscription code at startup. This ensures your engine reacts passively when Gamispace triggers the start signal:

```javascript
function initGamispaceConnection() {
    if (typeof window.GamispaceAPI !== 'undefined') {
        window.GamispaceAPI.onPlatformReady = function() {
            window.GamispaceAPI.onProgressReceived = function(jsonString) {
                if (jsonString === "[]" || jsonString === "") return;
                var progress = JSON.parse(jsonString);
                console.log("Data received correctly.");
            };
            window.GamispaceAPI.requestProgress();
        };
        
        if (window.GamispaceAPI.isPlatformReady) {
            window.GamispaceAPI.onPlatformReady();
        }
    }
}
initGamispaceConnection();

```

## 5. Export and Upload Rules (.zip)

To ensure a successful and instant deployment on Gamispace, your final compression must strictly meet the following requirements:

1. **WebGL Format:** Generate your build exclusively under the WebGL/HTML5 format. It is recommended to enable Brotli or Gzip compression in the publishing profiles to accelerate the initial loading speed on the web.


2. **Root File Location:** When compressing the `.zip` file to upload it to the platform, the basic `index.html` file must be located exactly in the root directory of the compressed package. Do not include a main container folder before the index file. For Unity, simply compress the folder selected in the build settings to `.zip`, the one that bears the project name and contains the `index.html` and the `Build` and `TemplateData` folders.


3. **Automatic Injection:** Do not make manual modifications to the generated `index.html` file. Gamispace transparently and dynamically injects the entire API environment during the game's loading process on the platform.



## 6. Troubleshooting

| Problem | Cause and Solution |
| --- | --- |
| **Unity: The game crashes completely in the browser showing the generic error "RuntimeError: null function".** | **1. Code Stripping (IL2CPP):** The automatic optimizer removed your functions, considering them dead code. Make sure to add the metadata decorator `[UnityEngine.Scripting.Preserve]` above the script, data classes, and methods invoked by strings in JavaScript.

<br>

<br>

<br>**2. Hidden Exceptions in WebGL:** By default, Unity silences C# crashes on the web. To debug the real error in your logic, go to the Unity menu under *Edit > Project Settings > Player > WebGL > Publishing Settings* and change the Enable Exceptions parameter to *Explicit* mode. This will expose the real trace (e.g., NullReferenceException) in your browser's web console.

 |
| **Unity: The SendMessage system throws explicit or silent failures.** | Meticulously verify that a GameObject exists in your first active hierarchical scene, named with exact spelling as `WebBridge` (case-sensitive) and that it is not nested as a child of any other structural node.

 |
| **The game freezes or does not update variable states after performing a save.** | Inspect the browser console using F12. If the save return function reports a null or false state, validate the client's HTTP connection state, user session persistence, or potential network interferences in the communication channel.

 |

```

```
