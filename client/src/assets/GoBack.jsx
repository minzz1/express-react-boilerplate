import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function GoBack() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };
  return (
    <div
      onClick={handleClick}
      className="cursor-pointer mx-2 w-8 h-8 flex 
    justify-center items-center 
    bg-gray-900 rounded-full"
    >
      <MdOutlineKeyboardArrowLeft color="white" size="20" />
    </div>
  );
}
