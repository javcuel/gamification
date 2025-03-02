import { useEffect, useState } from 'react';
import UserService from '../adapters/api/userService';

import StorageService from '../services/storageService';
import TokenService from '../services/tokenService';

export const getUserType = (userTypeCode: string): string => {
  switch (userTypeCode) {
    case 'A':
      return 'Admin';
    case 'D':
      return 'Dev';
    default:
      return 'User';
  }
};

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
        const decoded = TokenService.decodeAndValidateToken(token); // Decode the token for user info

        if (decoded) {
          setUserInfo((prev) => ({
            ...prev,
            userName: decoded.userName,
            userType: getUserType(decoded.userType),
          }));

          const scoreData = await UserService.fetchUserScore(); // Fetch score and stars
          if (scoreData) {
            setUserInfo((prev) => ({
              ...prev,
              userScore: scoreData.score,
              userStars: scoreData.stars,
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
