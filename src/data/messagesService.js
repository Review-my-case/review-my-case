import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

function messagesRef(caseId) {
  return collection(db, "cases", caseId, "messages");
}

export async function sendMessage(caseId, senderId, senderName, text) {
  await addDoc(messagesRef(caseId), {
    senderId,
    senderName,
    text,
    createdAt: serverTimestamp(),
  });
}

export function subscribeToMessages(caseId, callback) {
  const q = query(messagesRef(caseId), orderBy("createdAt", "asc"));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}
