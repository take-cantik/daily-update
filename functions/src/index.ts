import { credential, firestore, initializeApp } from "firebase-admin";
import { https } from "firebase-functions";
import { NextApiRequest, NextApiResponse } from "next";

export interface CurrentUser {
  id: string;
  uid: string;
  githubId: string;
  githubAvatarUrl: string;
  dailyContributions: number[];
  totalContributions: number;
  version: number;
  twitterId?: string;
  twitterAvatarUrl?: string;
}

const app = initializeApp({
  credential: credential.applicationDefault(),
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DETABASE_URL
});
const db = firestore(app);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = https.onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// export const dailyUpdate = pubsub
//   .schedule("every 1 days")
//   .onRun(async () => {
//     await db.collection("users").get();
//   });

export const dailyUpdate = https.onRequest(
  async (request: NextApiRequest, response: NextApiResponse) => {
    const users: CurrentUser[] = [];
    const res = await db.collection("users").get();
    res.forEach((doc) => {
      users.push(doc.data() as CurrentUser);
    });
    response.send(users);
  }
);
