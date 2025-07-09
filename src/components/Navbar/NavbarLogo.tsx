import google from "../../assets/Google_2015_logo.svg.webp";

export default function NavbarLogo() {
  return (
    <div className="flex items-center gap-2 ">
      <img
        src={google}
        alt="google logo"
        className="w-20 h-15 object-contain align-middle"
      />
      <h1 className="text-2xl  font-semibold text-gray-700">News</h1>
    </div>
  );
}
