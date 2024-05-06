import { v4 as uuidv4 } from 'uuid';
import { 
  collection, 
  doc, 
  getDoc,
  getDocs,
  setDoc, 
  updateDoc, 
  } from "firebase/firestore"; 

import { db } from '@/lib/firebase';

import { RoomConverter, User, UserConverter } from './types';

// 部屋に参加する
export const joinRoom = async (roomId: string, isOwner = false) => {
  const roomRef = doc(db, 'rooms', roomId).withConverter(RoomConverter);
  const roomSnap = await getDoc(roomRef);
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

// 部屋に参加しているユーザのリストを取得
export const getUsers = async (roomId: string) => {
  const usersRef = collection(db, 'rooms', roomId, 'participants').withConverter(UserConverter);
  const usersSnapshot = await getDocs(usersRef);
  return usersSnapshot.docs.map(doc => doc.data());
}

export const updateUserName = async (roomId: string, userId: string, name: string) => {
  const userRef = doc(db, 'rooms', roomId, 'participants', userId).withConverter(UserConverter);
  await updateDoc(userRef, { name: name });
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

// クッキーからユーザーIDを取得、なければ新しいユーザーIDを生成
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


