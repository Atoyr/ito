import { 
  FirestoreDataConverter, 
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
      online: user.isOnline ?? false, 
      isOwner: user.isOwner ?? false,
    };
  },
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    const user = {
      ...data,
    } as User;
    return user;
  },
};


