import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../../../helpers/api";

export default function usePhotoAlbums() {
  const queryClient = useQueryClient();

  async function managePhotoAlbum(photoId: string, albumsIds: string[]) {
    try {
      await api.put(`/photos/${photoId}/albums`, {
        albumsIds,
      });

      queryClient.invalidateQueries({ queryKey: ["photo", photoId] });
      queryClient.invalidateQueries({ queryKey: ["photos"] });

      toast.success("Updated Albums");
    } catch (error) {
      toast.error("Error managing photo albums");
      throw error;
    }
  }

  return {
    managePhotoAlbum,
  };
}
