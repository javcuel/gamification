using UnityEngine; 
using System.Collections; 
using System.Runtime.InteropServices; 
using System.Collections.Generic; 
using UnityEngine.Scripting; // Requerido para impedir que el optimizador borre código 
 
[Preserve] // Evita que el optimizador IL2CPP elimine la clase completa al compilar 
public class WebBridge : MonoBehaviour 
{ 
    public static WebBridge instance; 
 
    [DllImport("__Internal")] private static extern bool IsGamispaceAPIReadyJS(); 
    [DllImport("__Internal")] private static extern void RequestProgressJS(); 
    [DllImport("__Internal")] private static extern void SendPlayDataJS(int level, int score, 
float time, int completedStatus); 
 
    public Dictionary<int, NivelData> datosProgreso = new Dictionary<int, NivelData>(); 
    public System.Action OnDatosActualizados; 
 
    void Awake() 
    { 
        if (instance == null) { instance = this; DontDestroyOnLoad(gameObject); 
gameObject.name = "WebBridge"; } 
        else { Destroy(gameObject); } 
    } 
 
    IEnumerator Start() 
    { 
        int intentos = 0; 
        #if UNITY_WEBGL && !UNITY_EDITOR 
        // Polling: Esperamos hasta que la plataforma haya inyectado la API de forma segura 
        while (!IsGamispaceAPIReadyJS() && intentos < 50)  
        { 
            yield return new WaitForSeconds(0.1f); 
            intentos++; 
        } 
        RequestProgressJS();  
        #else 
        // Mantiene el iterador activo en el Editor local, evitando el error de compilación CS0161 
        yield return null;  
        Debug.Log("[Simulación Editor] Modo local activo. Puente listo."); 
        #endif 
    } 
 
    public void GuardarPartida(int nivel, int puntos, float tiempo, bool nivelSuperado) 
    { 
        #if UNITY_WEBGL && !UNITY_EDITOR 
        SendPlayDataJS(nivel, puntos, tiempo, nivelSuperado ? 1 : 0); 
        #else 
        Debug.Log($"[Simulación] Nivel {nivel} guardado. Puntos: {puntos} | Tiempo: {tiempo}s | Estado: {nivelSuperado}"); 
        #endif 
    } 
 
    [Preserve] // Evita que IL2CPP elimine este método invocado externamente desde JS mediante SendMessage 
    public void OnProgressReceived(string jsonString) 
    { 
        // Validación temprana y segura para manejar limpiamente a jugadores completamente nuevos 
        if (jsonString == "[]" || string.IsNullOrWhiteSpace(jsonString)) { 
OnDatosActualizados?.Invoke(); return; } 
         
        try  
        { 
            NivelData[] progreso = JsonHelper.FromJson<NivelData>(jsonString); 
            datosProgreso.Clear(); 
            foreach (var dato in progreso) { datosProgreso[dato.level] = dato; } 
            OnDatosActualizados?.Invoke(); 
        } 
        catch (System.Exception e) 
        { 
            Debug.LogError("Error al procesar el JSON de progreso web: " + e.Message); 
        } 
    } 
 
    [Preserve] // Evita que IL2CPP elimine este método invocado desde JS 
    public void OnPlaySaved(int successStatus)  
    {  
        if (successStatus == 1) { RequestProgressJS(); }  
        else { Debug.LogError("Error de red: La plataforma web no pudo procesar el guardado."); } 
    } 
} 
 
[System.Serializable] 
[Preserve] // Conserva la estructura de datos intacta para la serialización JSON en WebGL 
public class NivelData { public int level; public int score; public float time; public bool 
completed; } 
 
[Preserve] 
public static class JsonHelper { 
    public static T[] FromJson<T>(string json) { 
        return JsonUtility.FromJson<Wrapper<T>>("{ \"array\": " + json + "}").array; 
    } 
    [System.Serializable] [Preserve] private class Wrapper<T> { public T[] array; } 
}