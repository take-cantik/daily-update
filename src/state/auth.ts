import { User } from "firebase/auth";
import { useEffect } from "react";
import { atom, useSetRecoilState } from "recoil";
import { TotalContributions, useContributions } from "~/hook/useContributions";
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
  const { getTotalContributions } = useContributions();

  useEffect(() => {
    const unSub = firebaseAuth.onAuthStateChanged(async (user) => {
      if (!user) {
        setAuthState({ isLoading: false });
        return;
      }

      // @ts-ignore
      const githubId = user.reloadUserInfo.providerUserInfo[0].screenName;
      const totalContributions: TotalContributions =
        await getTotalContributions(githubId);

      console.log(totalContributions);

      setAuthState({
        isLoading: false,
        currentUser: user
      });
    });

    return () => unSub();
  });

  return null;
};
