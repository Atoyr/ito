import { 
  FirestoreDataConverter, 
  serverTimestamp,
} from 'firebase/firestore'

export interface User {
  id: string;
  name: string;
  isOnline: boolean;
  isOwner: boolean;
}

export const UserConverter: FirestoreDataConverter<User> = {
  toFirestore: (user) => {
    return {
      __type : 'user',
      id :user.id,
      name: user.name ?? 'unknown',
      isOwner: user.isOwner ?? false,
      lastActive: serverTimestamp(),
    };
  },
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    const user = {
      id: data.id,
      name: data.name,
      isOnline: true, // TODO HEART BEAT
      isOwner : data.isOwner,
    } as User;
    return user;
  },
};


