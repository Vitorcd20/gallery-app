import Container from "../components/container";
import AlbumsFilter from "../context/albums/components/albums-filter";
import UseAlbums from "../context/albums/hooks/use-albums";
import PhotosList from "../context/photos/components/photo-list";
import UsePhotos from "../context/photos/hooks/use-photos";

export default function PageHome() {
  const { albums, isLoadingAlbums } = UseAlbums();
  const { photos, isLoadingPhotos } = UsePhotos();

  return (
    <>
      <Container>
        <AlbumsFilter
          albums={albums}
          loading={isLoadingAlbums}
          className="mb-9"
        />
        <PhotosList photos={photos} loading={isLoadingPhotos} />
      </Container>
    </>
  );
}
