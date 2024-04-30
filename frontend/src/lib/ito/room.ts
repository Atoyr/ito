import { v4 as uuidv4 } from 'uuid';
import { 
  addDoc, 
  collection, 
  doc, 
  getDoc,
  setDoc, 
  onSnapshot, 
  serverTimestamp } from "firebase/firestore"; 

import { db } from '@/lib/firebase';

import { Room } from './types/room';

export const createRoom = async () => {
  const roomRef = await addDoc(collection(db, "rooms"), {
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    status: "waiting",
    participants: [],
  });

  console.log("Room created with ID: ", roomRef.id);
  return roomRef.id;
}

export const joinRoom = async (roomId: string) => {
  const roomRef = doc(db, 'rooms', roomId);
  const roomSnap = await getDoc(roomRef);
  if (!roomSnap.exists()) {
    console.log("No such room!");
    return null;
  }

  const userId = getOrCreateUserId();
  trackUserPresence(roomId, userId);
  console.log(`User ${userId} joined room ${roomId}`);
};

export const getRoomInfo = async (roomId: string) => {
  const roomRef = doc(db, 'rooms', roomId);
  const roomSnap = await getDoc(roomRef);
  if (!roomSnap.exists()) {
    console.log("No such document!");
    return null;
  }
  return roomSnap.data();
}


// TODO
const listenToRoomParticipants = (roomId: string, changeUser: (id: string) => void) => {
  const roomRef = doc(db, 'rooms', roomId);

  // ルームの参加者リストの変更を監視
  onSnapshot(roomRef, docSnapshot => {
    changeUser(docSnapshot.data().participants);
  });
}

// クッキーにユーザーIDを保存
const setUserIdInCookie = (userId: string) => {
  document.cookie = `userId=${userId};path=/ito;max-age=2592000`; // 30日間有効
};

// クッキーからユーザーIDを取得
const getUserIdFromCookie = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; userId=`);
  if (parts.length === 2) return parts.pop()!.split(';').shift();
  return null;
}

export const getOrCreateUserId = () : string => {
  const userId = getUserIdFromCookie();
  if (userId) {
    return userId;
  }

  // 新しいユーザーIDを生成
  const newUserId = uuidv4();
  setUserIdInCookie(newUserId);
  return newUserId;
};


// ユーザーのプレゼンスを追跡
// TODO
export const trackUserPresence =  (roomId: string, userId: string) => {
  const userStatusRef = doc(db, 'rooms', roomId, 'participants', userId);

  setDoc(userStatusRef, { status: 'online' })
}


