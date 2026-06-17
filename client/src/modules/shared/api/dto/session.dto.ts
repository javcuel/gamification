/**
 * Interface representing the session data as it comes from the backend.
 *
 * @interface
 */
export interface SessionDTO {
    IDSession: number;
    IDUser: number;      
    LoginTime: string;
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