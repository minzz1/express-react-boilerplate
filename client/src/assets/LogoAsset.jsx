import Logo from "./png/logo.png";

export default function LogoAsset({ large }) {
  return (
    <div
      className={`${large ? "w-60" : "w-40"} 
      flex justify-center items-center`}
    >
      <img src={Logo} alt="logo" />
    </div>
  );
}
