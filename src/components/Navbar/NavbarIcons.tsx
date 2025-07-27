import { useEffect, useState } from "react";
import { FaCog } from "react-icons/fa";
import user from "../../assets/user.png";
import { auth } from "../../firebase/firebase";
import Profile from "../Profile";
import { googleSignIn } from "../../utils/authUtils";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import { onAuthStateChanged, type User } from "firebase/auth";
import * as S from "../../styles/sharedStyles";
import type { changelangProps } from "../../types/types";

export default function NavbarIcons({
  selectedLang,
  onLangChange,
}: changelangProps) {
  const [profile, setProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setCurrentUser);
    return () => unsubscribe();
  }, []);

  const handleSettingsClick = () => {
    setShowSettings((prev) => !prev);
    setShowLanguageDropdown(false);
  };

  const handleLangChangeClick = () => {
    setShowLanguageDropdown(true);
    setShowSettings(false);
  };

  const avatarUrl = currentUser?.photoURL?.trim() || user;

  return (
    <div
      className={`${S.flex} ${S.itemsCenter} ${S.gap4} ${S.ml4} ${S.relative}`}
    >
      {/* Settings Button */}
      <div className={S.relative}>
        <button
          aria-label="Settings"
          className="text-xl text-gray-700 cursor-pointer focus:outline-none focus-visible:ring"
          onClick={handleSettingsClick}
        >
          <FaCog />
        </button>

        {showSettings && (
          <div
            className={`${S.absolute} ${S.right0} ${S.mt2} w-44 ${S.bgWhite} ${S.border} ${S.shadow} ${S.roundedLg} z-20`}
          >
            <button
              onClick={handleLangChangeClick}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none focus-visible:ring"
              aria-label="Change Language"
            >
              Change Language
            </button>
          </div>
        )}
      </div>

      {/* User Avatar or Sign In */}
      {currentUser ? (
        <button
          onClick={() => setProfile(true)}
          className="rounded-full focus:outline-none focus-visible:ring"
          aria-label="Open Profile"
        >
          <img
            src={avatarUrl}
            onError={(e) => {
              e.currentTarget.src = user;
            }}
            alt="User Avatar"
            className={`${S.roundedFull} ${S.w9} ${S.h9} object-cover cursor-pointer`}
          />
        </button>
      ) : (
        <button
          onClick={googleSignIn}
          className={`${S.bgBlue500} ${S.textWhite} ${S.px4} py-1.5 ${S.textSm} ${S.rounded} cursor-pointer focus:outline-none focus-visible:ring`}
          aria-label="Sign in with Google"
        >
          Sign in
        </button>
      )}

      {/* Language Dropdown */}
      {showLanguageDropdown && (
        <LanguageSelector
          isOpen={showLanguageDropdown}
          onClose={() => setShowLanguageDropdown(false)}
          selected={selectedLang}
          onSelect={(lang) => {
            onLangChange(lang);
            setShowLanguageDropdown(false);
          }}
        />
      )}

      {/* Profile Modal */}
      {profile && <Profile setProfile={setProfile} />}
    </div>
  );
}
