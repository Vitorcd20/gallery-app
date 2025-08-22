import Container from "../components/container";
import PhotoWidget from "../context/photos/components/photo-widget";

export default function PageHome() {
  return (
    <>
      <Container>
        <div className="grid grid-cols-4 gap-9">
          <PhotoWidget
            photo={{
              id: "123",
              title: "teste",
              imageId: "portrait-tower.png",
              albums: [
                { id: "321", title: "Album 1" },
                { id: "123", title: "Album 2" },
                { id: "455", title: "Album 3" },
              ],
            }}
          />
        </div>
      </Container>
    </>
  );
}
