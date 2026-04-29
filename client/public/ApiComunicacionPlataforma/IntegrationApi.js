// client/public/ApiComunicacionPlataforma/IntegrationApi.js

window.GamispaceAPI = {
    // ---------------------------------------------------------
    // 1. FUNCIONES PARA QUE LAS LLAME EL MOTOR (Unity, Godot...)
    // ---------------------------------------------------------

    /**
     * El juego llama a esta función cuando necesita saber qué niveles están desbloqueados
     * y cuáles son los récords actuales del jugador.
     */
    requestProgress: function() {
        console.log("[GamispaceAPI] El juego ha solicitado el progreso.");
        // Le pedimos a la ventana padre (React) que nos consiga el progreso
        window.parent.postMessage({ type: 'GAMISPACE_REQUEST_PROGRESS' }, '*');
    },

    /**
     * El juego llama a esta función cuando el usuario termina un intento en un nivel.
     * @param {number} level - El número del nivel jugado.
     * @param {number} score - Puntuación obtenida en el intento.
     * @param {number} time - Tiempo tardado en segundos/milisegundos.
     * @param {boolean} completed - true si superó el nivel, false si perdió/abandonó.
     */
    sendPlayData: function(level, score, time, completed) {
        console.log(`[GamispaceAPI] Enviando datos: Nivel ${level}, Puntos ${score}, Tiempo ${time}, Completado: ${completed}`);
        // Le mandamos a React el paquete de datos completo para que lo guarde en BD
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
    // 2. CALLBACKS PARA RESPONDER AL MOTOR (Unity, Godot...)
    // ---------------------------------------------------------
    // Los desarrolladores del juego asignarán sus propias funciones a estas variables
    // para reaccionar cuando React les conteste.

    /**
     * Recibirá un String en formato JSON con la mejor partida de cada nivel.
     * Criterio de "Mejor": Mayor Score. En caso de empate, Menor Time.
     * Formato esperado: "[{\"level\":1,\"score\":2100,\"time\":105.000,\"completed\":1}, ...]"
     */
    onProgressReceived: null, 

    /**
     * Recibirá 'true' cuando la plataforma confirme que los datos se han guardado.
     */
    onPlaySaved: null         
};

// ---------------------------------------------------------
// 3. ESCUCHADOR DE MENSAJES (Lo que responde React)
// ---------------------------------------------------------
window.addEventListener('message', function(event) {
    const message = event.data;

    // Si React nos manda el progreso de los niveles desde la BD
    if (message.type === 'GAMISPACE_RECEIVE_PROGRESS') {
        console.log("[GamispaceAPI] Progreso recibido desde la plataforma.");
        if (typeof window.GamispaceAPI.onProgressReceived === 'function') {
            // Se lo pasamos al juego en formato texto (String JSON)
            window.GamispaceAPI.onProgressReceived(JSON.stringify(message.payload));
        }
    }

    // Si React nos confirma que se ha guardado la partida exitosamente
    if (message.type === 'GAMISPACE_PLAY_SAVED_SUCCESS') {
        console.log("[GamispaceAPI] Plataforma confirma guardado exitoso.");
        if (typeof window.GamispaceAPI.onPlaySaved === 'function') {
            window.GamispaceAPI.onPlaySaved(true);
        }
    }
});