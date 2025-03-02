import httpClient from "../../../../adapters/api/httpClient";
import { User } from "../../../../entities/user";

interface AddUserPayload {
  name: string;
  password: string;
  role: string;
  group: string;
}

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const apiResponse = await httpClient.get("/users/");
    return apiResponse.map((user: any) => ({
      id: user.IDUsuario,
      name: user.Nombre,
      type: user.TipoUsuario,
      score: 0,
      stars: 0,
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};

/**
 * Deletes a specific user.
 * @param {number} userId - The ID of the user to delete.
 * @returns {Promise<void>} A promise that resolves when the user is deleted.
 */
export const deleteUser = async (userId: number): Promise<void> => {
  try {
    await httpClient.delete(`/users/${userId}`);
  } catch (error) {
    console.error(`Error deleting user (ID: ${userId}):`, error);
    throw new Error("Failed to delete user");
  }
};

/**
 * Add a new user via API.
 * @param {AddUserPayload} payload - The user data to add.
 * @returns {Promise<void>} A promise resolving when the user is added.
 */
export const addUserService = async (
  payload: AddUserPayload
): Promise<void> => {
  try {
    await httpClient.post("/users/add", payload);
  } catch (error) {
    console.error("Error adding user:", error);
    throw new Error("Failed to add user");
  }
};
