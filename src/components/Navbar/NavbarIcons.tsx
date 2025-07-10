import { useEffect, useState } from "react";
import { FaCog } from "react-icons/fa";
import user from "../../assets/user.png";
import { auth } from "../../firebase/firebase";
import Profile from "../Profile";
import { googlesignin } from "../../utils/authUtils";
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

  return (
    <div
      className={`${S.flex} ${S.itemsCenter} ${S.gap4} ${S.ml4} ${S.relative}`}
    >
      <div className={S.relative}>
        <FaCog
          className="text-xl text-gray-700 cursor-pointer"
          onClick={handleSettingsClick}
        />
        {showSettings && (
          <div
            className={`${S.absolute} ${S.right0} ${S.mt2} w-44 ${S.bgWhite} ${S.border} ${S.shadow} ${S.roundedLg} z-20`}
          >
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={handleLangChangeClick}
            >
              Change Language
            </button>
          </div>
        )}
      </div>

      {currentUser ? (
        <img
          src={currentUser.photoURL || user}
          alt="User"
          onClick={() => setProfile(true)}
          className={`${S.roundedFull} ${S.w9} ${S.h9} cursor-pointer object-cover`}
        />
      ) : (
        <button
          onClick={googlesignin}
          className={`${S.bgBlue500} ${S.textWhite} ${S.px4} py-1.5 ${S.textSm} ${S.rounded} cursor-pointer`}
        >
          Sign in
        </button>
      )}

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

      {profile && <Profile setProfile={setProfile} />}
    </div>
  );
}
