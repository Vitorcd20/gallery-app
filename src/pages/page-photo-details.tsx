import { useParams } from "react-router";
import Container from "../components/container";
import PhotosNavigator from "../context/photos/components/photos-navigator";
import Text from "../components/text";
import Skeleton from "../components/skeleton";
import ImagePreview from "../components/image-preview";
import Button from "../components/button";
import AlbumsListSelectable from "../context/albums/components/albums-list-selectable";
import UseAlbums from "../context/albums/hooks/use-albums";
import UsePhoto from "../context/photos/hooks/use-photo";
import type { Photo } from "../context/photos/models/photo";

export default function PagePhotoDetails() {
  const { id } = useParams();
  const { photo, isLoadingPhoto } = UsePhoto(id);

  const { albums, isLoadingAlbums } = UseAlbums();

  if (!isLoadingPhoto && !photo) {
    return <div>Photo not found!</div>;
  }

  return (
    <>
      <Container>
        <header className="flex items-center justify-between gap-8 mb-8">
          {!isLoadingPhoto ? (
            <Text as="h2" variant="heading-large">
              {photo?.title}
            </Text>
          ) : (
            <Skeleton className="w-48 h-48" />
          )}

          <PhotosNavigator />
        </header>

        <div className="grid grid-cols-[21rem_1fr] gap-24">
          <div className="space-y-3">
            {!isLoadingPhoto ? (
              <ImagePreview
                src={`${import.meta.env.VITE_IMAGES_URL}/${photo?.imageId}`}
                title={photo?.title}
                imageClassName="h-[21rem]"
              />
            ) : (
              <Skeleton className="h-[21rem]" />
            )}

            {!isLoadingPhoto ? (
              <Button variant="destructive">Remove</Button>
            ) : (
              <Skeleton className="w-20 h-10" />
            )}
          </div>

          <div className="py-3">
            <Text as="h3" variant="heading-medium" className="mb-6">
              Albums
            </Text>

            <AlbumsListSelectable
              photo={photo as Photo}
              albums={albums}
              loading={isLoadingAlbums}
            />
          </div>
        </div>
      </Container>
    </>
  );
}
