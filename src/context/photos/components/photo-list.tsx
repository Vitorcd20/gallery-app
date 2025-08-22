import Skeleton from "../../../components/skeleton";
import Text from "../../../components/text";
import type { Photo } from "../models/photo";
import PhotoWidget from "./photo-widget";

interface PhotosListProps {
  photos: Photo[];
  loading?: boolean;
}

export default function PhotosList({ photos, loading }: PhotosListProps) {
  return (
    <div className="space-y-6">
      <Text
        as="div"
        variant="paragraph-large"
        className="flex items-center gap-1 justify-end text-accent-span"
      >
        Total:{" "}
        {!loading ? (
          <div>{photos.length}</div>
        ) : (
          <Skeleton className="w-6 h-6" />
        )}
      </Text>

      {!loading && photos?.length > 0 && (
        <div className="grid grid-cols-4 gap-9">
          {photos.map((photo) => (
            <PhotoWidget key={photo.id} photo={photo} />
          ))}{" "}
        </div>
      )}
      {loading && (
        <div className="grid grid-cols-4 gap-9">
          {Array.from({ length: 10 }).map((_, index) => (
            <PhotoWidget
              key={`photo-loading-${index}`}
              photo={{} as Photo}
              loading
            />
          ))}
        </div>
      )}
      {!loading && photos.length === 0 && (
        <div className="flex justify-center items-center h-full">
          <Text variant="paragraph-large">No photo found</Text>
        </div>
      )}
    </div>
  );
}
