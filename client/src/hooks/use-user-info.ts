import { useEffect, useState } from 'react';
import { User, UserApi } from '../api/user';
import Storage from '../services/storage-service'; // Renombrado según el TODO
import { decodeToken } from '../services/token';

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<User>({
    id: 1,
    name: 'UserName',
    role: 'User',
    totalScore: 0,
    completedSubjects: 0,
  });

  useEffect(() => {
    const loadUserInfo = async () => {
      const token = Storage.getItem('token');

      if (token) {
        const decoded = decodeToken(token);

        if (decoded) {
          setUserInfo((prev) => ({
            ...prev,
            id: decoded.id,
            name: decoded.name,
            role: decoded.role,
          }));

          const scoreData = await UserApi.getScore(decoded.id);
          if (scoreData) {
            setUserInfo((prev) => ({
              ...prev,
              totalScore: scoreData.totalScore,
              completedSubjects: scoreData.completedSubjects,
            }));
          }
        }
      }
    };

    loadUserInfo();
  }, []);

  return userInfo;
};
