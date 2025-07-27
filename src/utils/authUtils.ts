import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase";
import { toast } from "react-toastify";

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const googleSignIn = async (): Promise<void> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    if (user?.email) {
      localStorage.setItem("currentUser", user.email);
      toast.success("Logged in successfully");
    } else {
      toast.warning("No user information found.");
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    console.error("Google Sign-In Error:", error);
    toast.error(errorMessage);
  }
};
