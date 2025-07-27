import { auth } from "../firebase/firebase";
import user from "../assets/user.png";
import out from "../assets/logout.png";
import { signOut } from "firebase/auth";
import { useNavigate } from "@tanstack/react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { profileProp } from "../types/types";
import * as S from "../styles/sharedStyles";
import { SlClose } from "react-icons/sl";
import { useEffect } from "react";

const Profile = ({ setProfile }: profileProp) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.currentUser?.uid) {
      localStorage.setItem("currentUser", auth.currentUser.uid);
    }
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      setProfile(false);
      localStorage.removeItem("currentUser");
      navigate({ to: "/" });
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Logout failed");
    }
  };

  return (
    <>
      <ToastContainer autoClose={3000} />
      <div
        className="relative z-10"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-title"
        aria-describedby="profile-description"
      >
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
                  className={`mt-3 sm:ml-4 sm:mt-0 sm:text-left ${S.flex} ${S.flexCol} ${S.justifyCenter} ${S.itemsCenter}`}
                >
                  <div
                    className={`${S.flex} ${S.itemsCenter} ${S.wFull} ${S.justifyBetween}`}
                  >
                    <h3
                      id="profile-title"
                      className={`${S.textBase} ${S.fontSemibold} ${S.leading6} ${S.textGray900} text-center flex-1`}
                    >
                      {auth?.currentUser?.email}
                    </h3>
                    <button
                      onClick={() => setProfile(false)}
                      className={`${S.ml5} ${S.textGray600} ${S.fontBold} ${S.cursorPointer} focus:outline-none focus:ring`}
                      aria-label="Close profile"
                    >
                      <SlClose size={18} />
                    </button>
                  </div>

                  <img
                    src={auth?.currentUser?.photoURL || user}
                    onError={(e) => (e.currentTarget.src = user)}
                    className={`${S.w20} ${S.h20} ${S.roundedFull} ${S.mt6}`}
                    alt="User avatar"
                  />

                  <h1 className={S.text2xl} id="profile-description">
                    Hi, {auth?.currentUser?.displayName || "there"}!
                  </h1>

                  <button
                    onClick={logout}
                    className={`${S.cursorPointer} ${S.flex} ${S.itemsCenter} ${S.rounded3xl} ${S.bgWhite} ${S.p3} ${S.w60} ${S.mt7} hover:bg-gray-100 transition`}
                    aria-label="Sign out"
                  >
                    <img
                      src={out}
                      className={`${S.w5} ${S.h5} ${S.ml16}`}
                      alt="Sign out icon"
                    />
                    <span className={S.ml3}>Sign out</span>
                  </button>

                  <p className={`${S.textXs} ${S.mt6}`}>
                    Privacy Policy : Terms of Service
                  </p>
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
