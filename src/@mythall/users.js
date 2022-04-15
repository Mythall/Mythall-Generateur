import { doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, orderBy, setDoc } from "firebase/firestore";
import { db } from "../assets/js/firebase";

class Role {
  constructor(joueur, animateur, organisateur) {
    this.joueur = true;
    this.animateur = false;
    this.organisateur = false;
  }
}

class User {
  constructor(id, { displayname, firstname, lastname, dateOfBirth, email, photoURL, roles }) {
    this.uid = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.displayname = displayname ? displayname : `${firstname} ${lastname}`;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
    if (photoURL) this.photoURL = photoURL;
    if (roles) this.roles = roles;
  }

  saveState() {
    return {
      uid: this.uid,
      displayname: this.displayname ? this.displayname : null,
      firstname: this.firstname ? this.firstname : null,
      lastname: this.lastname ? this.lastname : null,
      dateOfBirth: this.dateOfBirth ? this.dateOfBirth : null,
      email: this.email ? this.email : null,
      photoURL: this.photoURL ? this.photoURL : null,
      roles: this.roles ? this.roles : null
    };
  }
}

const getUsers = async () => {
  return (await getDocs(query(collection(db, "users"), orderBy("displayname")))).docs.map(snap => {
    return new User(snap.id, snap.data());
  });
};

const getUser = async id => {
  const snap = await getDoc(doc(db, `users/${id}`));
  return new User(snap.id, snap.data());
};

const addUser = async user => {
  return await addDoc(collection(db, `users`), user.saveState());
};

const updateUser = async user => {
  return await updateDoc(doc(db, `users/${user.id}`), user.saveState());
};

const setUser = async user => {
  return await setDoc(doc(db, `users/${user.uid}`), user.saveState());
};

const deleteUser = async id => {
  return await deleteDoc(doc(db, `users/${id}`));
};

export { User, getUsers, getUser, addUser, updateUser, setUser, deleteUser };
