import * as firebase from "firebase/app";
import {
  getAuth,
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  collection as firebaseCollection,
  query,
  getDocs,
  setDoc,
  addDoc,
  doc,
  where,
  WhereFilterOp,
  deleteDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  databaseUrl: import.meta.env.VITE_FIREBASE_DATABASEURL,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
};

class Firebase {
  app: firebase.FirebaseApp;
  auth: Auth;
  db: ReturnType<typeof getFirestore>;
  storage: ReturnType<typeof getStorage>;

  constructor() {
    this.app = firebase.initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app);
    this.storage = getStorage(this.app);
  }

  sanitizeUser(user: any) {
    return {
      uid: user?.uid,
      email: user?.email,
      displayName: user?.displayName,
      photoURL: user?.photoURL,
      emailVerified: user?.emailVerified,
      phoneNumber: user?.phoneNumber,
      team: user?.team,
    };
  }

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return new Promise((resolve, reject) => {
      signInWithPopup(auth, provider)
        .then((response) => {
          console.log({ response });
          if (response) {
            const { user } = response || {};
            resolve(this.sanitizeUser(user));
          }
          reject(new Error("Sorry, something went wrong. Please try later"));
        })
        .catch(() => {
          const message = "Sorry, something went wrong. Please try later";
          reject(new Error(message));
        });
    });
  }

  signInWithGithub() {
    const provider = new GithubAuthProvider();
    const auth = getAuth();
    provider.addScope("read:user");
    return new Promise((resolve, reject) => {
      signInWithPopup(auth, provider)
        .then((response) => {
          if (response) {
            const { user } = response || {};
            resolve(this.sanitizeUser(user));
          }
          reject(new Error("Sorry, something went wrong. Please try later"));
        })
        .catch((error) => {
          console.log({ error });
          const message = "Sorry, something went wrong. Please try later";
          reject(new Error(message));
        });
    });
  }

  getQuerySnapshotData = async (querySnapshot: any) => {
    const res: any = [];
    querySnapshot.forEach((doc: any) => {
      if (doc.exists) {
        res.push({ ...doc.data(), id: doc.id });
      }
    });
    return res;
  };

  query({
    collection,
    filter,
  }: {
    collection: string;
    filter: { field: string; op: WhereFilterOp; value?: string }[];
  }) {
    const filterArgs = filter.map((w) => {
      return where(w.field, w.op, w.value);
    });
    if (!filterArgs.length)
      return query(firebaseCollection(this.db, collection));
    return query(firebaseCollection(this.db, collection), ...filterArgs);
  }

  async saveData({
    collection,
    data,
    id,
  }: {
    collection: string;
    data: any;
    id?: string;
  }) {
    if (id) {
      const docRef = doc(this.db, collection, id);
      const result = await setDoc(docRef, { ...data }, { merge: true });
      return result;
    } else {
      const result = await addDoc(
        firebaseCollection(this.db, collection),
        data
      );
      return result.id;
    }
  }

  async getCollectionData({
    collection,
    where,
  }: {
    collection: string;
    where: { field: string; op: WhereFilterOp; value?: string }[];
  }) {
    const docRef = this.query({ collection, filter: where });
    const docSnap = await getDocs(docRef);
    return {
      total: docSnap.size,
      data: await this.getQuerySnapshotData(docSnap.docs),
    };
  }

  async removeCollectionData({
    collection,
    id,
  }: {
    collection: string;
    id: string;
  }) {
    await deleteDoc(doc(this.db, collection, id));
  }
}
export default new Firebase();
