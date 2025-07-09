import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase";
import { toast } from "react-toastify";

// Force account selection every time
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const googlesignin = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    if (auth.currentUser?.email) {
      localStorage.clear()
      toast.success("Logged in successfully");
    }
  } catch (err: any) {
    console.error(err);
    toast.error(err.message || "Login failed");
  }
};
