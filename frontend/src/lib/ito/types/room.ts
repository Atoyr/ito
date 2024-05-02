import { 
  FirestoreDataConverter, 
  serverTimestamp,
} from 'firebase/firestore'

import { User } from './user';

export interface Room {
  createdAt: Date;
  updatedAt: Date;
  status: string;
}

export type OnUserChange = (user: User) => void;

export const RoomConverter: FirestoreDataConverter<Room> = {
  toFirestore: (room) => {
    return {
      __type : 'room',
      createdAt :room.createdAt ?? serverTimestamp(),
      modifiedAt : serverTimestamp(),
      status: room.status ?? 'waiting',
    };
  },
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    const room = {
      ...data,
    } as Room;
    return room;
  },
};

