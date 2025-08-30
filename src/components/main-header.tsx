import Container from "./container";
import Logo from "../assets/icons/favicon.svg?react";
import { Link, useLocation } from "react-router";
import cx from "classnames";
import Button from "./button";
import PhotosSearch from "./photos-search";
import Divider from "./divider";
import PhotoNewDialog from "../context/photos/components/photo-new-dialog";
import AlbumNewDialog from "../context/albums/components/album-new-dialog";

interface MainHeaderProps extends React.ComponentProps<"div"> {}

export default function MainHeader({ className, ...props }: MainHeaderProps) {
  const { pathname } = useLocation();

  return (
    <Container
      as="header"
      className={cx("flex justify-between items-center gap-10", className)}
      {...props}
    >
      <Link to="/">
        <Logo className="h-5" />
      </Link>

      {pathname === "/" && (
        <>
          <PhotosSearch />
          <Divider orientation="vertical" className="h-10" />
        </>
      )}

      <div className="flex items-center gap-3">
        <PhotoNewDialog trigger={<Button>New Photo</Button>} />
        <AlbumNewDialog
          trigger={<Button variant="secondary">Create album</Button>}
        />
      </div>
    </Container>
  );
}
