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
import { authState, CurrentUser } from "~/state/auth";
import { useUserCase } from "./useUserCase";

export const useAuth = () => {
  const { addTwitter } = useUserCase();

  const githubLogin = async (): Promise<UserCredential> => {
    const provider = new GithubAuthProvider();
    return await signInWithPopup(firebaseAuth, provider);
  };

  const twitterLink = async (currentUser: CurrentUser): Promise<void> => {
    const provider = new TwitterAuthProvider();
    if (firebaseAuth.currentUser) {
      const docRef = await linkWithPopup(firebaseAuth.currentUser, provider);
      addTwitter(docRef.user, currentUser);
    }
  };

  const logout = (): Promise<void> => {
    return signOut(firebaseAuth);
  };

  return {
    auth: useRecoilState(authState)[0],
    githubLogin,
    twitterLink,
    logout
  };
};
