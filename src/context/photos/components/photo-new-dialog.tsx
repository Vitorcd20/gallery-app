import { useForm } from "react-hook-form";
import Alert from "../../../components/alert";
import Button from "../../../components/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../../../components/dialog";
import ImagePreview from "../../../components/image-preview";
import InputSingleFile from "../../../components/input-single-file";
import InputText from "../../../components/input-text";
import Skeleton from "../../../components/skeleton";
import Text from "../../../components/text";
import UseAlbums from "../../albums/hooks/use-albums";

interface PhotoNewDialogProps {
  trigger: React.ReactNode;
}

export default function PhotoNewDialog({ trigger }: PhotoNewDialogProps) {
  const form = useForm()
  const {albums, isLoadingAlbums} = UseAlbums()

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>Upload a Photo</DialogHeader>

        <DialogBody className="flex flex-col gap-5">
          <InputText placeholder="Choose a title" maxLength={255} />

          <Alert>
            Maximum size: 50MB
            <br />
            You can select files in PNG, JPG or JPEG
          </Alert>

          <InputSingleFile
            form={form}
            allowedExtensions={["jpg", "jpeg", "png"]}
            maxFileSizeInMB={50}
            replaceBy={<ImagePreview className="w-full h-56" />}
          />

          <div className="space-y-3">
            <Text variant="label-small">Select Albums</Text>

            <div className="flex flex-wrap gap-3">

            {!isLoadingAlbums &&
              albums.length > 0 &&
              albums.map((album) => (
                <Button
                  key={album.id}
                  variant="ghost"
                  size="sm"
                  className="truncate"
                >
                  {album.title}
                </Button>
              ))}

            {isLoadingAlbums &&
              Array.from({ length: 5 }).map((_, index) => (
                <Skeleton className="w-20 h-7" key={`album-loading-${index}`} />
              ))}
          </div>
          </div>
        </DialogBody>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>

          <Button>Attach</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
