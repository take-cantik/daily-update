import { credential, firestore, initializeApp } from "firebase-admin";
import { config, https, logger } from "firebase-functions";
import { getContributinos } from "./api/contribution";
import { getUserList } from "./api/user";
import { CurrentUser } from "./types";
// import { updateVersion } from "./util/version";

const app = initializeApp({
  credential: credential.applicationDefault(),
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DETABASE_URL
});
export const db = firestore(app);
export const baseUrl = config().base.url;

export const dailyUpdate = https.onRequest(async (request, response) => {
  response.jsonp();

  const users: CurrentUser[] = await getUserList();

  logger.log(users);

  users.forEach(async (user: CurrentUser) => {
    const newContributions = await getContributinos(user.githubId);
    logger.log("newcontributions");
    logger.log(newContributions);
    // const newVersion = updateVersion(
    //   user.version,
    //   user.dailyContributions,
    //   user.totalContributions,
    //   newContributions.dailyContributions.values,
    //   newContributions.totalContributinos.value
    // );
    // console.log("newVersion");
    // console.log(newVersion);

    // ツイート

    // await updateUser(
    //   user.id,
    //   newVersion,
    //   newContributions.dailyContributions.values,
    //   newContributions.totalContributinos.value
    // );
  });

  response.send("ahi");
});
