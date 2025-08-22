import Container from "../components/container";
import AlbumsFilter from "../context/albums/models/components/albums-filter";
import PhotosList from "../context/photos/components/photo-list";

export default function PageHome() {
  return (
    <>
      <Container>
        <AlbumsFilter albums={[{ id: "321", title: "Album 1" }]} className="mb-9" />
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
