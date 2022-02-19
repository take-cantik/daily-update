import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where
} from "firebase/firestore";
import { useState } from "react";
import { firestore } from "~/infra/firebase";
import { CreateUser, CurrentUser } from "~/state/auth";

export const useUser = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | undefined>(
    undefined
  );

  const fetch = async (uid: string) => {
    try {
      const response = await getDocs(
        query(collection(firestore, "users"), where("uid", "==", uid))
      );

      if (response.docs.length !== 0) {
        setCurrentUser({
          id: response.docs[0].id,
          uid: response.docs[0].data().uid,
          githubId: response.docs[0].data().githubId,
          githubAvatarUrl: response.docs[0].data().githubAvatarUrl,
          contributions: response.docs[0].data().contributions,
          version: response.docs[0].data().version,
          twitterId: response.docs[0].data().twitterId,
          twitterAvatarUrl: response.docs[0].data().twitterAvatarUrl
        });
      }
    } catch {
      throw new Error();
    }
  };

  const createUser = async (user: CreateUser) => {
    try {
      const docRef = await addDoc(collection(firestore, "users"), user);

      return docRef;
    } catch {
      throw new Error();
    }
  };

  const addTwitterUser = async (
    id: string,
    twitterId: string,
    twitterAvatarUrl: string
  ) => {
    try {
      const docRef = updateDoc(doc(firestore, "users", id), {
        twitterId,
        twitterAvatarUrl
      });

      return docRef;
    } catch {
      throw new Error();
    }
  };

  return { currentUser, fetch, createUser, addTwitterUser };
};
