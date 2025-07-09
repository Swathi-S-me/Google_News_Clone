import { useEffect, useState } from "react";
import { FaCog } from "react-icons/fa";
import user from "../../assets/user.png";
import { auth } from "../../firebase/firebase";
import Profile from "../Profile";
import { googlesignin } from "../../utils/authUtils";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import type { changelangProps } from "../../types/types";
import { onAuthStateChanged, type User } from "firebase/auth";

export default function NavbarIcons({ selectedLang, onLangChange }: changelangProps) {
  const [profile, setProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
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
    <div className="flex items-center gap-4 ml-4 relative">
      {/* Settings */}
      <div className="relative">
        <FaCog
          className="text-xl text-gray-700 cursor-pointer"
          onClick={handleSettingsClick}
        />
        {showSettings && (
          <div className="absolute right-0 mt-2 w-44 bg-white border shadow rounded z-20">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={handleLangChangeClick}
            >
              Change Language
            </button>
           
          </div>
        )}
      </div>

      {/* Profile / Sign in */}
      {currentUser ? (
        <img
          src={currentUser.photoURL || user}
          alt="User"
          onClick={() => setProfile(true)}
          className="rounded-full w-9 h-9 cursor-pointer object-cover"
        />
      ) : (
        <button
          onClick={googlesignin}
          className="bg-blue-500 text-white px-4 py-1.5 text-sm rounded cursor-pointer"
        >
          Sign in
        </button>
      )}

      {/* Language Modal */}
      {showLanguageDropdown && (
        <LanguageSelector
          isOpen={showLanguageDropdown}
          onClose={() => setShowLanguageDropdown(false)}
          selected={selectedLang}
          onSelect={(lang: string) => {
            onLangChange(lang);
            setShowLanguageDropdown(false);
          }}
        />
      )}

      {/* Profile Component */}
      {profile && <Profile setProfile={setProfile} />}
    </div>
  );
}
