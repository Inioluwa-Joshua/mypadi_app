import { useEffect, useState } from 'react';

export const fetchUser = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (typeof storedUser !== "undefined" && storedUser !== null) {
      // If user data is available, update the state
      setUserInfo(JSON.parse(storedUser));
    } else {
      // If user data is not available, set default state
      localStorage.clear();
      setUserInfo(null); // or whatever default value you want
    }
  }, []); // Run only once when the component mounts

  return userInfo;
};
