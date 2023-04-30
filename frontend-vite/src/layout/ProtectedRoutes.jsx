import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner";
import Layout from "./Layout";

const ProtectedRoutes = ({ children }) => {
  const { auth, loading } = useAuth();

  if (loading)
    return (
      <Spinner
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    );

  return (
    <>{auth?._id ? <Layout>{children}</Layout> : <Navigate to="/login" />}</>
  );
};
export default ProtectedRoutes;
