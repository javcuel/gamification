mergeInto(LibraryManager.library, { 
    IsGamispaceAPIReadyJS: function() { 
        return (typeof window.GamispaceAPI !== 'undefined'); 
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