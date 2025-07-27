import { useNavigate } from "@tanstack/react-router";
import * as S from "../styles/sharedStyles";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main
      role="alert"
      className={`${S.hScreen} ${S.flex} ${S.flexCol} ${S.itemsCenter} ${S.justifyCenter} ${S.bgGray100} ${S.textCenter} ${S.p6}`}
    >
      <h1 className={`${S.text5xl} ${S.fontBold} ${S.textRed600} ${S.mb4}`}>
        404
      </h1>
      <h2 className={`${S.text2xl} ${S.fontSemibold} ${S.mb2}`}>
        Page Not Found
      </h2>
      <p className={`${S.textGray500} ${S.mb6}`}>
        The page you're looking for doesn't exist.
      </p>

      <button
        type="button"
        aria-label="Go back to homepage"
        title="Return to Home"
        onClick={() => navigate({ to: "/" })}
        className={`${S.bgBlue600} ${S.textWhite} ${S.px4} ${S.py2} ${S.rounded} ${S.hoverBgBlue700} ${S.transition} ${S.cursorPointer} focus:outline-none focus:ring focus:ring-blue-300`}
      >
        Go to Home
      </button>
    </main>
  );
}
