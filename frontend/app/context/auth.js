import { useState } from "react";

const AuthContext = () => {
  const [authUser, setAuthUser] = useState({});
  return { authUser, setAuthUser };
};
export default AuthContext;
