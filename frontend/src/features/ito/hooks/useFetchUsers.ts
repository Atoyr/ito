import { useState, useEffect } from 'react';

import { getUsers } from '@/lib/ito';
import { User } from '@/lib/ito/types';


export const useFetchUsers = (roomId: string | undefined, interval = 5000) => { // デフォルトで5秒ごと
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = () => {
      if (!roomId) return;
      getUsers(roomId).then((data) => { setUsers(data); })
      .catch(error => {
        console.error("Error fetching users:", error);
      });
    };

    fetchUsers(); // コンポーネントマウント時に一度実行
    const intervalId = setInterval(fetchUsers, interval); // 指定された間隔で実行

    return () => clearInterval(intervalId); // アンマウント時にインターバルをクリア
  }, [interval]);

  return users;
}
