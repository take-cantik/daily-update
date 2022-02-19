import { User } from "firebase/auth";
import { useSetRecoilState } from "recoil";
import { authState, CurrentUser } from "~/state/auth";
import {
  DaliyContributions,
  TotalContributions,
  useContributions
} from "./useContributions";
import { CreateUser, useUser } from "./useUser";

export const useUserCase = () => {
  const { getTotalContributions, getDaliyContributions } = useContributions();
  const { createUser, addTwitterUser } = useUser();
  const setAuthState = useSetRecoilState(authState);

  const create = async (user: User) => {
    // @ts-ignore
    const githubUser = user.reloadUserInfo.providerUserInfo[0];
    const githubId = githubUser.screenName;
    const dailyContributions: DaliyContributions = await getDaliyContributions(
      githubId
    );
    console.log(dailyContributions);
    const totalContributions: TotalContributions = await getTotalContributions(
      githubId
    );
    const initialVersion = Math.floor(totalContributions.value / 1000) * 10000;

    const newUser: CreateUser = {
      uid: user.uid,
      githubId: githubId,
      githubAvatarUrl: githubUser.photoUrl,
      dailyContributions: dailyContributions.values,
      totalContributions: totalContributions.value,
      version: initialVersion
    };

    const response = await createUser(newUser);
    console.log(response);

    setAuthState({
      isLoading: false,
      currentUser: newUser as CurrentUser
    });
  };

  const addTwitter = async (user: User, currentUser: CurrentUser) => {
    // @ts-ignore
    const twitterUser = user.reloadUserInfo.providerUserInfo[1];
    await addTwitterUser(
      currentUser.id,
      twitterUser.screenName,
      twitterUser.photoUrl
    );

    const newUser: CurrentUser = {
      id: currentUser.id,
      uid: currentUser.uid,
      githubId: currentUser.githubId,
      githubAvatarUrl: currentUser.githubAvatarUrl,
      dailyContributions: currentUser.dailyContributions,
      totalContributions: currentUser.totalContributions,
      version: currentUser.version,
      twitterId: twitterUser.screenName,
      twitterAvatarUrl: twitterUser.photoUrl
    };

    setAuthState({
      isLoading: false,
      currentUser: newUser
    });
  };

  return {
    create,
    addTwitter
  };
};
