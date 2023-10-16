import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
export default function Favorite({ isSelected }) {
  return (
    <div className="w-full h-full">
      {isSelected ? <MdFavorite size="24" /> : <MdFavoriteBorder size="24" />}
    </div>
  );
}
