import { useEffect } from "react";
import { atom, useSetRecoilState } from "recoil";
import { TotalContributions, useContributions } from "~/hook/useContributions";
import { useUser } from "~/hook/useUser";
import { firebaseAuth } from "~/infra/firebase";

export interface CreateUser {
  uid: string;
  githubId: string;
  githubAvatarUrl: string;
  contributions: number;
  version: number;
}

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
  const { getTotalContributions } = useContributions();
  const { currentUser, fetch, createUser, addTwitterUser } = useUser();

  useEffect(() => {
    const unSub = firebaseAuth.onAuthStateChanged(async (user) => {
      if (!user) {
        setAuthState({ isLoading: false });
        return;
      }

      await fetch(user.uid);

      if (!currentUser) {
        // @ts-ignore
        const githubUser = user.reloadUserInfo.providerUserInfo[0];
        const githubId = githubUser.screenName;
        const totalContributions: TotalContributions =
          await getTotalContributions(githubId);
        const initialVersion =
          Math.floor(totalContributions.value / 1000) * 10000;

        const newUser: CreateUser = {
          uid: user.uid,
          githubId: githubId,
          githubAvatarUrl: githubUser.photoUrl,
          contributions: totalContributions.value,
          version: initialVersion
        };

        await createUser(newUser);
      } else {
        if (!currentUser.twitterId && user.providerData.length === 2) {
          // @ts-ignore
          const twitterUser = user.reloadUserInfo.providerUserInfo[1];
          await addTwitterUser(
            currentUser.id,
            twitterUser.screenName,
            twitterUser.photoUrl
          );
        }
      }

      // fetch(user.uid);
      console.log(currentUser);

      setAuthState({
        isLoading: false,
        currentUser
      });
    });

    return () => unSub();
  });

  return null;
};
