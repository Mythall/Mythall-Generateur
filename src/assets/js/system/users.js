import { db } from "../firebase";
import { doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, orderBy } from "firebase/firestore";

class Role {
  constructor(joueur, animateur, organisateur) {
    this.joueur = true;
    this.animateur = false;
    this.organisateur = false;
  }
}

class User {
  constructor(id, { displayName, firstname, lastname, dateOfBirth, email, photoURL, roles }) {
    this.uid = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.displayName = displayName ? displayName : `${firstname} ${lastname}`;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
    this.photoURL = photoURL;
    this.roles = roles;
  }

  saveState() {
    return {
      displayName: this.displayName,
      firstname: this.firstname,
      lastname: this.lastname,
      dateOfBirth: this.dateOfBirth,
      email: this.email,
      photoURL: this.photoURL,
      roles: this.roles
    };
  }
}

const getUsers = async () => {
  return (await getDocs(query(collection(db, "users")), orderBy("nom"))).docs.map(snap => {
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

const deleteUser = async id => {
  return await deleteDoc(doc(db, `users/${id}`));
};

export { User, getUsers, getUser, addUser, updateUser, deleteUser };
