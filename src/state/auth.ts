import { User } from "firebase/auth";
import { useEffect } from "react";
import { atom, useSetRecoilState } from "recoil";
import { firebaseAuth } from "~/infra/firebase";

export interface AuthState {
  isLoading: boolean;
  currentUser?: User;
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

  useEffect(() => {
    const unSub = firebaseAuth.onAuthStateChanged(async (user) => {
      if (!user) {
        setAuthState({ isLoading: false });
        return;
      }

      setAuthState({
        isLoading: false,
        currentUser: user
      });
    });

    return () => unSub();
  });

  return null;
};
