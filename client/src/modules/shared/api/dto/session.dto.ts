/**
 * Interface representing the session data as it comes from the backend.
 *
 * @interface
 */
export interface SessionDTO {
    IDSession: number;
    LoginTime: string;  // En el DTO es string porque el JSON no tiene tipo Date
    LogoutTime: string | null;
}

/**
 * Interface representing the response when a session is successfully created.
 *
 * @interface
 */
export interface SessionCreateResponseDTO {
    message: string;
    IDSession: number;
}