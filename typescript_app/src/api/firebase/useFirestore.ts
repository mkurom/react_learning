import { useFirebase } from "./useFirebase";
import
firebase,
{
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { TodoType } from "../../type/todoType";

export const useFirestore = () => {

  const { firebaseApp } = useFirebase();

  const db = getFirestore(firebaseApp);

  const fetchAllTodos = async () => {
    const collectionRef = collection(db, 'todos') as firebase.CollectionReference<TodoType>;

    const docSnap = await getDocs(collectionRef);

    const todos = docSnap.docs.map((doc) => {
      // TodoType
      return doc.data();
    });

    return todos;
  }

  return { fetchAllTodos }
}
