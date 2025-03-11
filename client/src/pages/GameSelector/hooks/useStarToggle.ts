import { useState } from 'react';

const useStarToggle = () => {
  const [activeStar, setActiveStar] = useState(false);

  const toggleStar = () => {
    setActiveStar(!activeStar);
  };

  return { activeStar, toggleStar };
};

export default useStarToggle;
