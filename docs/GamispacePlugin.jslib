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