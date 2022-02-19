import { useEffect } from "react";
import { atom, useSetRecoilState } from "recoil";
import { useUser } from "~/hook/useUser";
import { useUserCase } from "~/hook/useUserCase";
import { firebaseAuth } from "~/infra/firebase";

export interface CurrentUser {
  id: string;
  uid: string;
  githubId: string;
  githubAvatarUrl: string;
  contributions: number;
  version: number;
  twitterId?: string;
  twitterAvatarUrl?: string;
}

export interface AuthState {
  isLoading: boolean;
  currentUser?: CurrentUser;
}

export const authState = atom<AuthState>({
  key: "authState",
  default: {
    isLoading: true
  },
  dangerouslyAllowMutability: true
});

export const AuthInit = () => {
  const setAuthState = useSetRecoilState(authState);
  const { findUserById } = useUser();
  const { create, addTwitter } = useUserCase();

  useEffect(() => {
    const unSub = firebaseAuth.onAuthStateChanged(async (user) => {
      if (!user) {
        setAuthState({ isLoading: false });
        return;
      }

      const currentUser: CurrentUser | undefined = await findUserById(user.uid);

      if (!currentUser) {
        create(user);
        return;
      } else {
        if (!currentUser.twitterId && user.providerData.length === 2) {
          addTwitter(user, currentUser);
          return;
        }
      }

      setAuthState({
        isLoading: false,
        currentUser
      });
    });

    return () => unSub();
  });

  return null;
};
