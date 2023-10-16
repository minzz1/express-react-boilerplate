import { BsQrCode } from "react-icons/bs";
export default function QrAsset({ isSelected }) {
  return (
    <div className="w-full h-full">
      {isSelected ? <BsQrCode size="24" /> : <BsQrCode size="24" />}
    </div>
  );
}
