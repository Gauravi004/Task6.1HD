import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  initializeFirestore, // ✅ import this
  doc,
  getDoc,
  setDoc,
  collection as _collection,
  addDoc as _addDoc,
} from "firebase/firestore";


// ✅ Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvk6ZS8hiSwXyPKa3a5Zd9afJlCT9NgA4",
  authDomain: "task7-9cafc.firebaseapp.com",
  projectId: "task7-9cafc",
  storageBucket: "task7-9cafc.appspot.com",
  messagingSenderId: "536027531551",
  appId: "1:536027531551:web:95a1dcecd54fbcadf4882a",
  measurementId: "G-9X6WCWKQSJ",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// ✅ Initialize Firestore with long-polling (fixes 400 error)
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

// ✅ Firebase Auth
export const auth = getAuth(app);

// ✅ Google Auth provider
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

// ✅ Google Sign-in
export const signInWithGoogle = () => signInWithPopup(auth, provider);

// ✅ Create user document in Firestore
export const createUserDoc = async (userAuth, additionalData = {}) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt: new Date(),
        ...additionalData,
      });
      console.log("User document created successfully!");
    } catch (error) {
      console.error("Error creating user document:", error.message);
    }
  }
  return userDocRef;
};

// ✅ Email signup
export const createUserWithEmail = async (email, password, displayName) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await createUserDoc(user, { displayName });
  return { user };
};

// ✅ Email login
export const signInUserWithEmail = async (email, password) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return { user };
};

// ✅ Export Firestore helpers
export const collection = _collection;
export const addDoc = _addDoc;

export { firebaseConfig };
