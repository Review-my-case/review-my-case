import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { storage, db } from "../firebase/config";

async function uploadImage(uid, uri, label) {
  const response = await fetch(uri);
  const blob = await response.blob();
  const fileRef = ref(storage, `verification/${uid}/${label}.jpg`);
  await uploadBytes(fileRef, blob);
  return getDownloadURL(fileRef);
}

export async function submitVerification(uid, idPhotoUri, selfiePhotoUri) {
  const [idPhotoUrl, selfiePhotoUrl] = await Promise.all([
    uploadImage(uid, idPhotoUri, "id"),
    uploadImage(uid, selfiePhotoUri, "selfie"),
  ]);

  await updateDoc(doc(db, "users", uid), {
    idPhotoUrl,
    selfiePhotoUrl,
    verificationStatus: "pending",
  });
}

export async function setVerificationStatus(uid, status) {
  await updateDoc(doc(db, "users", uid), { verificationStatus: status });
}
