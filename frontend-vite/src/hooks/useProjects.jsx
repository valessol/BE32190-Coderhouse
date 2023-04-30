import { useContext } from "react";
import { ProjectsContext } from "../context/CartContext";

const useProjects = () => {
  return useContext(ProjectsContext);
};
export default useProjects;
