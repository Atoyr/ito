import { db } from '@/lib/firebase';
import { v4 as uuidv4 } from 'uuid';

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
  const userStatusRef = db.ref(`rooms/${roomId}/participants/${userId}/status`);
  userStatusRef.set('online');
  userStatusRef.onDisconnect().set('offline').then(() => {
    console.log('onDisconnect() set up complete');
  });
}

