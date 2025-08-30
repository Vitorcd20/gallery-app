import InputText from "./input-text";
import SearchIcon from "../assets/icons/search.svg?react";
import { useCallback, useState } from "react";
import { debounce } from "../helpers/utils";
import UsePhotos from "../context/photos/hooks/use-photos";

export default function PhotosSearch() {
  const [inputValue, setInputValue] = useState("");
  const { filters } = UsePhotos();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetValue = useCallback(
    debounce((value: string) => {
      filters.setQ(value);
    }, 200),
    [filters.setQ]
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setInputValue(value);
    debouncedSetValue(value);
  }

  return (
    <InputText
      icon={SearchIcon}
      placeholder="Search Photos"
      className="flex-1"
      value={inputValue}
      onChange={handleInputChange}
    />
  );
}
