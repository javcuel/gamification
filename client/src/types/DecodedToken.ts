/** TODO: Ver si se puede sacar toda la información del usuario con una única
 * consulta SQL y quitamos esta interfaz absurda.
 */

export interface DecodedToken {
  userName: string;
  userType: string;
}
