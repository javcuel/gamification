import httpClient from "../../../../adapters/api/httpClient";
import { World } from "../../../../entities/world";

export const fetchWorlds = async (): Promise<World[]> => {
  try {
    const apiResponse = await httpClient.get("/worlds/");
    return apiResponse.map((world: any) => ({
      id: world.IDMundo,
      name: world.Nombre,
      imgWorldUrl: world.UrlImgMundo,
      imgBackgroundUrl: world.UrlImgDentro,
      isOpen: world.Abierto,
      isVisible: world.Visible,
      position: world.Posicion,
    }));
  } catch (error) {
    console.error("Error fetching worlds data");
    throw new Error("Error fetching worlds data");
  }
};
