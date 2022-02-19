import { useEffect } from "react";
import { atom, useSetRecoilState } from "recoil";
import { TotalContributions, useContributions } from "~/hook/useContributions";
import { useUser } from "~/hook/useUser";
import { firebaseAuth } from "~/infra/firebase";

export interface CurrentUser {
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
  const { getTotalContributions } = useContributions();
  const { findUserById, createUser } = useUser();

  useEffect(() => {
    const unSub = firebaseAuth.onAuthStateChanged(async (user) => {
      if (!user) {
        setAuthState({ isLoading: false });
        return;
      }

      console.log(user);

      const currentUser = await findUserById(user.uid);

      console.log(currentUser);
      console.log("ahi");

      if (!currentUser) {
        // @ts-ignore
        const githubUser = user.reloadUserInfo.providerUserInfo[0];
        const githubId = githubUser.screenName;
        const totalContributions: TotalContributions =
          await getTotalContributions(githubId);
        const initialVersion =
          Math.floor(totalContributions.value / 1000) * 10000;

        const res = await createUser({
          uid: user.uid,
          githubId: githubId,
          githubAvatarUrl: githubUser.photoUrl,
          contributions: totalContributions.value,
          version: initialVersion
        });

        console.log(res);
      }

      // if (user.providerData.length === 2) {

      // }
      // @ts-ignore
      const githubId = user.reloadUserInfo.providerUserInfo[0].screenName;
      const totalContributions: TotalContributions =
        await getTotalContributions(githubId);

      console.log(totalContributions);

      setAuthState({
        isLoading: false
      });
    });

    return () => unSub();
  });

  return null;
};
