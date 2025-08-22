import { useParams } from "react-router";
import Text from "../components/text";

export default function PagePhotoDetails() {
    const {id} = useParams()
  return (
    <>
      <Text variant="heading-medium">PagePhotoDetails</Text>
      <hr />
      <Text variant="heading-medium">phot id: {id}</Text>
    </>
  );
}
