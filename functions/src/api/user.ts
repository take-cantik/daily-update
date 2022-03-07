import { db } from "..";
import { CurrentUser } from "../types";

export const getUserList = async () => {
  const users: CurrentUser[] = [];
  const res = await db.collection("users").get();
  res.forEach((doc) => {
    const user: CurrentUser = {
      id: doc.id,
      uid: doc.data().uid,
      githubId: doc.data().githubId,
      githubAvatarUrl: doc.data().githubAvatarUrl,
      dailyContributions: doc.data().dailyContributions,
      totalContributions: doc.data().totalContributions,
      version: doc.data().version,
      twitterId: doc.data().twitterId,
      twitterAvatarUrl: doc.data().twitterAvatarUrl
    };
    users.push(user);
  });

  return users;
};

export const updateUser = async (
  id: string,
  version: number,
  dailyContributions: number[],
  totalContributions: number
) => {
  await db.collection("users").doc(id).update({
    version,
    dailyContributions,
    totalContributions
  });
};
