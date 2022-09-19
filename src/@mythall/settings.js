import { doc, getDoc, getDocs, addDoc, deleteDoc, collection, query, orderBy, setDoc } from "firebase/firestore";
import { db } from "../assets/js/firebase";

const getSettings = async () => {
  return (await getDocs(query(collection(db, "settings"), orderBy("nom")))).docs.map(snap => {
    return {
      id: snap.id,
      ...snap.data()
    };
  });
};

const getSetting = async id => {
  const snap = await getDoc(doc(db, `settings/${id}`));
  return {
    id: snap.id,
    ...snap.data()
  };
};

const addSetting = async setting => {
  return await addDoc(collection(db, `settings`), setting);
};

const updateSetting = async setting => {
  return await setDoc(doc(db, `settings/${setting.id}`), setting);
};

const deleteSetting = async id => {
  return await deleteDoc(doc(db, `settings/${id}`));
};

export { getSettings, getSetting, addSetting, updateSetting, deleteSetting };
