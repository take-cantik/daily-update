import {
  GithubAuthProvider,
  linkWithPopup,
  signInWithPopup,
  signOut,
  TwitterAuthProvider,
  UserCredential
} from "firebase/auth";
import { useRecoilState } from "recoil";
import { firebaseAuth } from "~/infra/firebase";
import { authState } from "~/state/auth";

export const useAuth = () => {
  const githubLogin = async (): Promise<UserCredential> => {
    const provider = new GithubAuthProvider();
    return await signInWithPopup(firebaseAuth, provider);
  };

  const twitterLink = async (): Promise<UserCredential | void> => {
    const provider = new TwitterAuthProvider();
    if (firebaseAuth.currentUser) {
      return await linkWithPopup(firebaseAuth.currentUser, provider);
    }
  };

  const logout = (): Promise<void> => {
    return signOut(firebaseAuth);
  };

  return {
    auth: useRecoilState(authState),
    githubLogin,
    twitterLink,
    logout
  };
};
