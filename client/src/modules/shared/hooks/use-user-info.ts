import { useEffect, useState } from 'react';

import Storage from '../../../services/storage-service';
import { decodeToken } from '../../../services/token';
import { userRepository } from '../api/repository/user.repository';

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'juan',
    role: 'U',
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

          const scoreData = await userRepository.getScore(decoded.id);
          if (scoreData) {
            setUserInfo((prev) => ({
              ...prev,
              name: decoded.name,
              role: decoded.role,
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
