import { 
  addDoc, 
  collection, 
  doc, 
  getDoc,
  serverTimestamp } from "firebase/firestore"; 

import { db } from '@/lib/firebase';

import { RoomConverter } from './types';

// 部屋を作成
export const createRoom = async () => {
  const roomRef = collection(db, "rooms").withConverter(RoomConverter);
  const room = await addDoc(roomRef, {
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    status: "waiting",
  });
  return room.id;
}

export const getRoom = async (roomId: string) => {
  const roomSnap = await getRoomSnap(roomId);
  if (!roomSnap.exists()) {
    throw new Error("No such room!");
  }
  return roomSnap.data();
}

const getRoomSnap = async (roomId: string) => {
  const roomRef = doc(db, 'rooms', roomId).withConverter(RoomConverter);
  return await getDoc(roomRef);
}
