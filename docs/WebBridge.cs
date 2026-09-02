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