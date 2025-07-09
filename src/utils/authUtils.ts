import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase";
import { toast } from "react-toastify";


googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const googlesignin = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    if (auth.currentUser?.email) {
      
      toast.success("Logged in successfully");
      localStorage.setItem("currentUser", auth.currentUser.email);
    }
  } catch (err: any) {
    console.error(err);
    toast.error(err.message || "Login failed");
  }
};
