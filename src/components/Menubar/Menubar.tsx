import { Link, useNavigate } from "@tanstack/react-router";
import type { menuProp } from "../../types/types";
import * as S from "../../styles/sharedStyles";

function Menubar({ menu,setMenu }: menuProp) {
  const navigate = useNavigate();

  const items: string[] = [
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
    <nav
      role="navigation"
      aria-label="Main Menu"
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
              onClick={() => setMenu("Following")}
              aria-current={
                menu === "Following" ? "page" : undefined
              }
              className={`${S.hoverTextBlack} ${S.cursorPointer} ${
                menu === "Following" ? S.activeMenu : ""
              }`}
            >
              {item}
            </Link>
          ) : (
            <button
              key={item}
              type="button"
              aria-label={`Go to ${item} news`}
              onClick={() => {
                setMenu(item);
                navigate({ to: "/" });
              }}
              className={`${S.hoverTextBlack} ${S.cursorPointer} ${S.bgTransparent} ${S.borderNone} 
              ${menu === item ? S.activeMenu : "" 
              }`}
            >
              {item}
            </button>
          )
        )}
      </div>
    </nav>
  );
}

export default Menubar;
