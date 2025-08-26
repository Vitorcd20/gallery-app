import Container from "../components/container";
import AlbumsFilter from "../context/albums/components/albums-filter";
import UseAlbums from "../context/albums/hooks/use-albums";
import PhotosList from "../context/photos/components/photo-list";

export default function PageHome() {
  const {albums, isLoadingAlbums} = UseAlbums()
  return (
    <>
      <Container>
        <AlbumsFilter albums={albums} loading={isLoadingAlbums} className="mb-9" />
        <PhotosList photos={[
          {
            id: "123",
            title: "teste",
            imageId: "portrait-tower.png",
            albums: [
              { id: "321", title: "Album 1" },
              { id: "123", title: "Album 2" },
              { id: "455", title: "Album 3" },
            ],
          }
        ]}  />
      </Container>
    </>
  );
}
