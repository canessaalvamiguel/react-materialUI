// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, deleteDoc, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { uuid } from 'uuidv4';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export function firebaseConfig(){
  const config = {
    apiKey: "AIzaSyAUoTLM8pxjUOU_XNDEtPQICPBZqLl5L0o",
    authDomain: "reactappdejmo01.firebaseapp.com",
    projectId: "reactappdejmo01",
    storageBucket: "reactappdejmo01.appspot.com",
    messagingSenderId: "259203264741",
    appId: "1:259203264741:web:bff95e9d6f8cc4dcfb240c",
    measurementId: "G-PS5SL2PYG4"
  };

// Initialize Firebase
  const app = initializeApp(config);
  const analytics = getAnalytics(app);
}

export async function firebaseCreateUser(email, password) {
  try{
    let response = await createUserWithEmailAndPassword(getAuth(), email, password);
  }catch (error){
    return error.message;
  }
  return true;
}

export async function firebaseLogin(email, password) {
  try {
    let credenciales = await signInWithEmailAndPassword(getAuth(), email, password);
  } catch (error) {
    return false;
  }
  return true;
}

export async function firebaseFind(collectionName){
  let clients = [];
  let query = collection(getFirestore(), collectionName);
  let results = await getDocs(query);
  results.forEach(document => {
    let object = document.data();
    object.id = document.id;
    clients.push(object);
  });
  return clients;
}

export async function firebaseSave(collection, object){
  object.id = uuid();
  let ref = doc(getFirestore(), collection, object.id);
  setDoc(ref, object);
}

export async function firebaseDelete(collection, id) {
  await deleteDoc(doc(getFirestore(), collection, id));
}
