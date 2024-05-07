import { 
  addDoc, 
  collection, 
  doc, 
  getDoc,
  updateDoc,
  serverTimestamp } from "firebase/firestore"; 

import { db } from '@/lib/firebase';

import { RoomConverter, Status } from './types';

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

// 部屋を取得
export const getRoom = async (roomId: string) => {
  const roomRef = doc(db, 'rooms', roomId).withConverter(RoomConverter);
  const roomSnap = await getDoc(roomRef);
  if (!roomSnap.exists()) {
    throw new Error("No such room!");
  }
  return roomSnap.data();
}

export const updateRoomStatus = async (roomId: string, status: Status) => {
  const roomRef = doc(db, 'rooms', roomId).withConverter(RoomConverter);
  await updateDoc(roomRef, { status, updatedAt: serverTimestamp() });
}
