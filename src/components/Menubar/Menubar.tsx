import { Link, useNavigate } from "@tanstack/react-router";
import type { menuProp } from "../../types/types";


function Menubar(props: menuProp) {
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
    <div className="bg-white shadow px-4 py-2 text-gray-500 overflow-x-auto">
      <div className="flex justify-center gap-10 whitespace-nowrap">
        {items.map((item) =>
          item === "Following" ? (
            <Link
              key={item}
              to="/following"
              className="hover:text-black cursor-pointer"
            >
              {item}
            </Link>
          ) : (
            <h1
              key={item}
              className="hover:text-black cursor-pointer"
              onClick={() => {
                props.setMenu(item);
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