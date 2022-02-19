import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "~/infra/firebase";
import { CreateUser, CurrentUser } from "~/state/auth";

export const useUser = () => {
  const createUser = async (user: CreateUser) => {
    try {
      const docRef = await addDoc(collection(firestore, "users"), user);

      return docRef;
    } catch {
      throw new Error();
    }
  };

  const findUserById = async (uid: string) => {
    try {
      const response = await getDocs(
        query(collection(firestore, "users"), where("uid", "==", uid))
      );

      console.log(response.docs[0].id);
      const curentUser: CurrentUser = {
        id: response.docs[0].id,
        uid: response.docs[0].data().uid,
        githubId: response.docs[0].data().githubId,
        githubAvatarUrl: response.docs[0].data().githubAvatarUrl,
        contributions: response.docs[0].data().contributions,
        version: response.docs[0].data().version,
        twitterId: response.docs[0].data().twitterId,
        twitterAvatarUrl: response.docs[0].data().twitterAvatarUrl
      };

      return curentUser;
    } catch {
      return null;
    }
  };

  return { createUser, findUserById };
};
