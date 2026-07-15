import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

const casesRef = collection(db, "cases");

export async function submitCase(ownerId, form, analysis) {
  const docRef = await addDoc(casesRef, {
    ownerId,
    category: form.category,
    story: form.story,
    urgencyLabel: form.urgency,
    status: "pending",
    urgency: analysis?.urgency || "standard",
    score: analysis?.justiceScore ?? null,
    summary: analysis?.summary || "",
    violations: analysis?.violations || [],
    nextSteps: analysis?.nextSteps || [],
    lawyerId: null,
    lawyerName: null,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export function subscribeToUserCases(ownerId, callback) {
  const q = query(casesRef, where("ownerId", "==", ownerId), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export function subscribeToAllCases(callback) {
  const q = query(casesRef, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export async function acceptCase(caseId, lawyerId, lawyerName) {
  await updateDoc(doc(db, "cases", caseId), {
    status: "matched",
    lawyerId,
    lawyerName,
  });
}

export async function updateCaseStatus(caseId, status) {
  await updateDoc(doc(db, "cases", caseId), { status });
}
