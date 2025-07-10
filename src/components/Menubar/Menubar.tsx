import { Link, useNavigate } from "@tanstack/react-router";
import type { menuProp } from "../../types/types";
import * as S from "../../styles/sharedStyles";

function Menubar({ setMenu }: menuProp) {
  const navigate = useNavigate();

  const items = [
    "Home",
    "For you",
    "Following",
    "India",
    "Local",
    "World",
    "Business",
    "Technology",
    "Entertainment",
    "Sports",
    "Science",
    "Health",
  ];

  return (
    <div
      className={`${S.bgWhite} ${S.shadow} ${S.px4} ${S.py2} ${S.textGray500} ${S.overflowXAuto}`}
    >
      <div
        className={`${S.flex} ${S.justifyCenter} ${S.gap10} ${S.whitespaceNoWrap}`}
      >
        {items.map((item) =>
          item === "Following" ? (
            <Link
              key={item}
              to="/following"
              className={`${S.hoverTextBlack} ${S.cursorPointer}`}
            >
              {item}
            </Link>
          ) : (
            <h1
              key={item}
              className={`${S.hoverTextBlack} ${S.cursorPointer}`}
              onClick={() => {
                setMenu(item);
                navigate({ to: "/" });
              }}
            >
              {item}
            </h1>
          )
        )}
      </div>
    </div>
  );
}

export default Menubar;
