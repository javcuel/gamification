import { useEffect, useState } from 'react';

import UserService from '../api/userService';
import StorageService from '../services/storageService';
import TokenService from '../services/tokenService';

interface UserInfo {
  name: string;
  type: string;
  totalScore: number;
  completedSubjects: number;
}

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: 'UserName',
    type: 'User',
    totalScore: 0,
    completedSubjects: 0,
  });

  useEffect(() => {
    const loadUserInfo = async () => {
      const token = StorageService.getItem('token');

      if (token) {
        const decoded = TokenService.decodeAndValidateToken(token);

        if (decoded) {
          setUserInfo((prev) => ({
            ...prev,
            name: decoded.userName,
            type: decoded.userType,
          }));

          const scoreData = await UserService.fetchUserScore();
          if (scoreData) {
            setUserInfo((prev) => ({
              ...prev,
              totalScore: scoreData.score,
              completedSubjects: scoreData.stars,
            }));
          }
        }
      }
    };

    loadUserInfo();
  }, []);

  return userInfo;
};

export default useUserInfo;
