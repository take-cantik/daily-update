import { db } from "..";
import { CurrentUser } from "../types";

export const getUserList = async () => {
  const users: CurrentUser[] = [];
  const res = await db.collection("users").get();
  res.forEach((doc) => {
    users.push(doc.data() as CurrentUser);
  });

  return users;
};

export const updateUser = async (
  id: string,
  version: number,
  dailyContributions: number[],
  totalContributinos: number
) => {
  await db.collection("users").doc(id).update({
    version,
    dailyContributions,
    totalContributinos
  });
};
