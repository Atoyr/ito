import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  doc, 
  serverTimestamp } from "firebase/firestore"; 
import { getOrCreateUserId, trackUserPresence } from './user';

export const createRoom = async () => {
  const docRef = await addDoc(collection(db, "rooms"), {
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  console.log("Room created with ID: ", docRef.id);
  return docRef.id;
}

export const joinRoom = (roomId: string) => {
  const userId = getOrCreateUserId();
  trackUserPresence(roomId, userId);
  console.log(`User ${userId} joined room ${roomId}`);
};

// TODO
const listenToRoomParticipants = (roomId: string) => {
  const roomRef = doc(db, 'rooms', roomId);

  // ルームの参加者リストの変更を監視
  roomRef.onSnapshot(docSnapshot => {
    if (docSnapshot.exists) {
      const data = docSnapshot.data();
      console.log("Current participants:", data.participants);
    } else {
      console.log("No such document!");
    }
  }, error => {
    console.log("Error listening to room updates:", error);
  });
}

