import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "~/infra/firebase";
import { CurrentUser } from "~/state/auth";

export const useUser = () => {
  const createUser = async (user: CurrentUser) => {
    const docRef = await addDoc(collection(firestore, "users"), user);

    return docRef;
  };

  const findUserById = async (uid: string) => {
    try {
      const response = await getDocs(
        query(collection(firestore, "users"), where("uid", "==", uid))
      );

      return response.docs[0].data();
    } catch {
      return null;
    }
  };

  return { createUser, findUserById };
};
