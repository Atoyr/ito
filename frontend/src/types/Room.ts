import { User } from './User';

export interface Room {
  name: string;
  users: User[];

  createdAt: number;
  isEnabling: boolean;
}

