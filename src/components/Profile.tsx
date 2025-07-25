// import { auth } from "../firebase/firebase";
// import user from "../assets/user.png";
// import out from "../assets/logout.png";
// import { signOut } from "firebase/auth";
// import { useNavigate } from "@tanstack/react-router";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import type { profileProp } from "../types/types";
// import * as S from "../styles/sharedStyles";

// const Profile = (props: profileProp) => {
//   const navigate = useNavigate();

//   const logout = async () => {
//     try {
//       await signOut(auth);
//       toast.success("Logged out successfully");
//       props.setProfile(false);
//       localStorage.removeItem("currentUser");
//       navigate({ to: "/" });
//     } catch (err: any) {
//       console.error(err);
//       toast.error(err.message || "Logout failed");
//     }
//   };

//   return (
//     <>
//       <ToastContainer autoClose={3000} />
//       <div className="relative z-10" role="dialog" aria-modal="true">
//         <div className="fixed inset-0"></div>

//         <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//           <div
//             className={`flex min-h-full items-end justify-end ${S.p4} ${S.textCenter} sm:items-start ${S.mt8} ${S.mr5} ${S.smP0}`}
//           >
//             <div
//               className={`relative transform overflow-hidden ${S.rounded3xl} ${S.bgSlate200} text-left shadow-xl transition-all ${S.smMy8} ${S.smW5_12} ${S.smH80} ${S.smMaxWmd}`}
//             >
//               <div
//                 className={`${S.bgSlate200} ${S.px4} ${S.pb4} ${S.pt5} ${S.smP6} ${S.smPb4}`}
//               >
//                 <div
//                   className={`mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left ${S.flex} ${S.flexCol} ${S.justifyCenter} ${S.itemsCenter}`}
//                 >
//                   <div className={`${S.flex} ${S.itemsCenter}`}>
//                     <h3
//                       className={`${S.textBase} ${S.fontSemibold} ${S.leading6} ${S.textGray900}`}
//                     >
//                       {auth?.currentUser?.email}
//                     </h3>
//                     <h1
//                       onClick={() => props?.setProfile(false)}
//                       className={`${S.ml5} ${S.cursorPointer}`}
//                     >
//                       X
//                     </h1>
//                   </div>

//                   {/* <img
//                     src={auth?.currentUser?.photoURL || user}
//                     className={`${S.w20} ${S.h20} ${S.roundedFull} ${S.mt6}`}
//                     alt="user avatar"
//                   /> */}
//                   <img
//                     src={auth?.currentUser?.photoURL || user}
//                     onError={(e) => (e.currentTarget.src = user)}
//                     className={`${S.w20} ${S.h20} ${S.roundedFull} ${S.mt6}`}
//                     alt="user avatar"
//                   />

//                   <h1 className={S.text2xl}>
//                     Hi, {auth?.currentUser?.displayName}!
//                   </h1>
//                   <div
//                     onClick={logout}
//                     className={`${S.cursorPointer} ${S.flex} ${S.itemsCenter} ${S.rounded3xl} ${S.bgWhite} ${S.p3} ${S.w60} ${S.mt7}`}
//                   >
//                     <img src={out} className={`${S.w5} ${S.h5} ${S.ml16}`} />
//                     <h1 className={S.ml3}>Signout</h1>
//                   </div>

//                   <h1 className={`${S.textXs} ${S.mt6}`}>
//                     Privacy Policy : Terms of Service
//                   </h1>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;




// components/Profile.tsx
import { auth } from "../firebase/firebase";
import user from "../assets/user.png";
import out from "../assets/logout.png";
import { signOut } from "firebase/auth";
import { useNavigate } from "@tanstack/react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { profileProp } from "../types/types";
import * as S from "../styles/sharedStyles";
import { useEffect } from "react";

const Profile = (props: profileProp) => {
  const navigate = useNavigate();

  // Store current user UID on mount
  useEffect(() => {
    if (auth?.currentUser?.uid) {
      localStorage.setItem("currentUser", auth.currentUser.uid);
    }
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      props.setProfile(false);
      localStorage.removeItem("currentUser"); // removes saved user context
      navigate({ to: "/" });
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Logout failed");
    }
  };

  return (
    <>
      <ToastContainer autoClose={3000} />
      <div className="relative z-10" role="dialog" aria-modal="true">
        <div className="fixed inset-0"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            className={`flex min-h-full items-end justify-end ${S.p4} ${S.textCenter} sm:items-start ${S.mt8} ${S.mr5} ${S.smP0}`}
          >
            <div
              className={`relative transform overflow-hidden ${S.rounded3xl} ${S.bgSlate200} text-left shadow-xl transition-all ${S.smMy8} ${S.smW5_12} ${S.smH80} ${S.smMaxWmd}`}
            >
              <div
                className={`${S.bgSlate200} ${S.px4} ${S.pb4} ${S.pt5} ${S.smP6} ${S.smPb4}`}
              >
                <div
                  className={`mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left ${S.flex} ${S.flexCol} ${S.justifyCenter} ${S.itemsCenter}`}
                >
                  <div className={`${S.flex} ${S.itemsCenter}`}>
                    <h3
                      className={`${S.textBase} ${S.fontSemibold} ${S.leading6} ${S.textGray900}`}
                    >
                      {auth?.currentUser?.email}
                    </h3>
                    <h1
                      onClick={() => props?.setProfile(false)}
                      className={`${S.ml5} ${S.cursorPointer}`}
                    >
                      X
                    </h1>
                  </div>

                  <img
                    src={auth?.currentUser?.photoURL || user}
                    onError={(e) => (e.currentTarget.src = user)}
                    className={`${S.w20} ${S.h20} ${S.roundedFull} ${S.mt6}`}
                    alt="user avatar"
                  />

                  <h1 className={S.text2xl}>
                    Hi, {auth?.currentUser?.displayName}!
                  </h1>

                  <div
                    onClick={logout}
                    className={`${S.cursorPointer} ${S.flex} ${S.itemsCenter} ${S.rounded3xl} ${S.bgWhite} ${S.p3} ${S.w60} ${S.mt7}`}
                  >
                    <img src={out} className={`${S.w5} ${S.h5} ${S.ml16}`} />
                    <h1 className={S.ml3}>Signout</h1>
                  </div>

                  <h1 className={`${S.textXs} ${S.mt6}`}>
                    Privacy Policy : Terms of Service
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
