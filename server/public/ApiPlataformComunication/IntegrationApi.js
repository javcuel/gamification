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
    onPlaySaved: null         
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
});