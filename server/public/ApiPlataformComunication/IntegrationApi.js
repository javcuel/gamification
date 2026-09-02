/**
 * @file IntegrationApi.js
 * @description Reactive communication bridge between Gamispace (React) and WebGL binaries.
 * 
 * INVERSION OF CONTROL ARCHITECTURE:
 * This script eliminates race conditions (Cold Starts) caused by network latency.
 * 
 * Execution flow:
 * 1. React mounts the `Iframe` component and waits for its native `onLoad` event.
 * 2. Once resolved, React raises the safety flag `isPlatformReady = true` and invokes `onPlatformReady()`.
 * 3. Scenario A (Engine wins the race): The game loads quickly, reads `isPlatformReady = false`, and waits 
 *    passively without throwing errors. When React finishes, it triggers the event and wakes up the game.
 * 4. Scenario B (React wins the race): The platform loads quickly and raises the flag. When the game 
 *    engine finishes booting its WebGL memory and subscribes, it reads `isPlatformReady = true` and receives data instantly.
 * 
 * @warning DO NOT reintroduce timers (setTimeout) or Polling loops to manage synchronization.
 */
window.GamispaceAPI = {
    // ---------------------------------------------------------
    // 1. FUNCTIONS TO BE CALLED BY THE ENGINE (Unity, Godot...)
    // ---------------------------------------------------------

    /**
     * The game calls this function when it needs to know which levels are unlocked
     * and what the player's current records are.
     */
    requestProgress: function() {
        console.log("[GamispaceAPI] The game has requested progress.");
        // We ask the parent window (React) to get the progress for us
        window.parent.postMessage({ type: 'GAMISPACE_REQUEST_PROGRESS' }, '*');
    },

    /**
     * The game calls this function when the user finishes an attempt on a level.
     * @param {number} level - The level number played.
     * @param {number} score - Score obtained in the attempt.
     * @param {number} time - Time taken in seconds/milliseconds.
     * @param {boolean} completed - true if the level was cleared, false if lost/abandoned.
     */
    sendPlayData: function(level, score, time, completed) {
        console.log(`[GamispaceAPI] Sending data: Level ${level}, Score ${score}, Time ${time}, Completed: ${completed}`);
        // We send the complete data payload to React so it can be saved in the DB
        window.parent.postMessage({
            type: 'GAMISPACE_SAVE_PLAY',
            payload: { 
                level: level, 
                score: score, 
                time: time, 
                completed: completed 
            }
        }, '*');
    },

    // ---------------------------------------------------------
    // 2. CALLBACKS TO RESPOND TO THE ENGINE (Unity, Godot...)
    // ---------------------------------------------------------
    // Game developers will assign their own functions to these variables
    // to react when React replies.

    /**
     * Will receive a JSON formatted String with the best play for each level.
     * "Best" criteria: Highest Score. In case of a tie, Lowest Time.
     * Expected format: "[{\"level\":1,\"score\":2100,\"time\":105.000,\"completed\":1}, ...]"
     */
    onProgressReceived: null, 

    /**
     * Will receive 'true' when the platform confirms that the data has been saved.
     */
    onPlaySaved: null,   
    /**
     * Triggered when the React platform confirms the iframe has fully loaded.
     * Games should assign a function to this variable to initialize their data fetching.
     */
    onPlatformReady: null,
    // Tracks if the React platform has already fired the ready event
    isPlatformReady: false    
};

// ---------------------------------------------------------
// 3. MESSAGE LISTENER (What React responds)
// ---------------------------------------------------------
window.addEventListener('message', function(event) {
    const message = event.data;

    // If React sends us the level progress from the DB
    if (message.type === 'GAMISPACE_RECEIVE_PROGRESS') {
        console.log("[GamispaceAPI] Progress received from the platform.");
        if (typeof window.GamispaceAPI.onProgressReceived === 'function') {
            // We pass it to the game in text format (JSON String)
            window.GamispaceAPI.onProgressReceived(JSON.stringify(message.payload));
        }
    }

    // If React confirms that the play was saved successfully
    if (message.type === 'GAMISPACE_PLAY_SAVED_SUCCESS') {
        console.log("[GamispaceAPI] Platform confirms successful save.");
        if (typeof window.GamispaceAPI.onPlaySaved === 'function') {
            window.GamispaceAPI.onPlaySaved(true);
        }
    }

    // Intercepts the ready signal from the parent window and notifies the game engine
    if (message.type === 'GAMISPACE_PLATFORM_READY') {
        console.log("[GamispaceAPI] Platform is ready. Notifying game...");
        window.GamispaceAPI.isPlatformReady = true;
        
        if (typeof window.GamispaceAPI.onPlatformReady === 'function') {
            window.GamispaceAPI.onPlatformReady();
        }
    }
    
});