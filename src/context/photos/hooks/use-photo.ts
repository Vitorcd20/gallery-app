import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api, fetcher } from "../../../helpers/api";
import type { Photo } from "../models/photo";
import type { PhotoNewFormSchema } from "../schemas";
import { toast } from "sonner";
import usePhotoAlbums from "./use-photos-albums";
import { useNavigate } from "react-router";

interface PhotoDetailResponse extends Photo {
  nextPhotoId?: string;
  previousPhotoId?: string;
}

export default function UsePhoto(id?: string) {
  const navigate = useNavigate()
  const { data, isLoading } = useQuery<PhotoDetailResponse>({
    queryKey: ["photo", id],
    queryFn: () => fetcher(`/photos/${id}`),
    enabled: !!id,
  });

  const queryClient = useQueryClient();

  const { managePhotoAlbum } = usePhotoAlbums();

  async function createPhoto(payload: PhotoNewFormSchema) {
    try {
      const { data: photo } = await api.post<Photo>("/photos", {
        title: payload.title,
      });

      await api.post(
        `/photos/${photo.id}/image`,
        {
          file: payload.file[0],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (payload.albumsIds && payload.albumsIds.length > 0) {
        await managePhotoAlbum(photo.id, payload.albumsIds);
      }

      queryClient.invalidateQueries({ queryKey: ["photos"] });

      toast.success("Photo added successfully!");
    } catch (error) {
      toast.error("Error creating photo");
      throw error;
    }
  }

  async function deletePhoto(photoId: string) {
    try {
      await api.delete(`/photos/${photoId}`);

      toast.success("Photo deleted successfully");

      navigate("/")
    } catch (error) {
      toast.error("Error deleting photo");
      throw error;
    }
  }

  return {
    photo: data,
    nextPhotoId: data?.nextPhotoId,
    previousPhotoId: data?.previousPhotoId,
    isLoadingPhoto: isLoading,
    createPhoto,
    deletePhoto,
  };
}
