import google from "../../assets/Google_2015_logo.svg.webp";
import * as S from "../../styles/sharedStyles";

export default function NavbarLogo() {
  return (
    <div className={`${S.flex} ${S.itemsCenter} ${S.gap2}`}>
      <img
        src={google}
        alt="Google"
        className={`${S.w20} ${S.h15} object-contain align-middle`}
      />
      <h1 className={`${S.text2xl} ${S.fontSemibold} ${S.textGray700}`}>
        News
      </h1>
    </div>
  );
}
