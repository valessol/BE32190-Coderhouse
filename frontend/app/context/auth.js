import { useEffect, useState } from "react";

const AuthContext = ({ initialState }) => {
  const [authUser, setAuthUser] = useState(initialState || {});

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(authUser));
  }, [authUser]);

  return { authUser, setAuthUser };
};
export default AuthContext;
