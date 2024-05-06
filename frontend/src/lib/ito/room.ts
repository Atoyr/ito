import { v4 as uuidv4 } from 'uuid';
import { 
  addDoc, 
  collection, 
  doc, 
  getDoc,
  getDocs,
  setDoc, 
  onSnapshot, 
  serverTimestamp } from "firebase/firestore"; 

import { db } from '@/lib/firebase';

import { RoomConverter, User, UserConverter } from './types';

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

// 部屋に参加する
export const joinRoom = async (roomId: string, isOwner = false) => {
  const roomSnap = await getRoomSnap(roomId);
  if (!roomSnap.exists()) {
    throw new Error("No such room!");
  }

  const userId = getOrCreateUserId();
  const userRef = doc(db, 'rooms', roomId, 'participants', userId).withConverter(UserConverter);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    return userDoc.data();
  }

  const user = {
    id: userId,
    isOnline: true, 
    isOwner,
  } as User;

  await setDoc(userRef, user, { merge: true });
  return (await getDoc(userRef)).data();
};

export const getRoom = async (roomId: string) => {
  const roomSnap = await getRoomSnap(roomId);
  if (!roomSnap.exists()) {
    throw new Error("No such room!");
  }
  return roomSnap.data();
}

export const getUsers = async (roomId: string) => {
  const usersRef = collection(db, 'rooms', roomId, 'participants').withConverter(UserConverter);
  const usersSnapshot = await getDocs(usersRef);
  return usersSnapshot.docs.map(doc => doc.data());
}

const getRoomSnap = async (roomId: string) => {
  const roomRef = doc(db, 'rooms', roomId).withConverter(RoomConverter);
  return await getDoc(roomRef);
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
  document.cookie = `userId=${userId};path=/;max-age=2592000`; // 30日間有効
};

// クッキーからユーザーIDを取得
const getUserIdFromCookie = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; userId=`);
  if (parts.length === 2) return parts.pop()!.split(';').shift();
  return null;
}

const getOrCreateUserId = () : string => {
  const userId = getUserIdFromCookie();
  if (userId) {
    return userId;
  }

  // 新しいユーザーIDを生成
  const newUserId = uuidv4();
  setUserIdInCookie(newUserId);
  return newUserId;
};

const getUser = async (roomId: string, userId: string) => {
  const userStatusRef = doc(db, 'rooms', roomId, 'participants', userId).withConverter(UserConverter);
  const userStatusSnap = await getDoc(userStatusRef);
  if (!userStatusSnap.exists()) {
    throw new Error("No such user!");
  }
  return userStatusSnap.data();
}


// ユーザーのプレゼンスを追跡
// TODO
export const trackUserPresence =  (roomId: string, userId: string) => {
  const userStatusRef = doc(db, 'rooms', roomId, 'participants', userId);
  setDoc(userStatusRef, { id: userId, status: 'online' })
}
