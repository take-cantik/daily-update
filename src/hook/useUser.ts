import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "~/infra/firebase";
import { CurrentUser } from "~/state/auth";

export const useUser = () => {
  const createUser = async (user: CurrentUser) => {
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

      return response.docs[0].data() as CurrentUser;
    } catch {
      return null;
    }
  };

  return { createUser, findUserById };
};
