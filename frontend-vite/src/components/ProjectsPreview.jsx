import { Link } from "react-router-dom";

const ProjectsPreview = ({ data }) => {
  const { name, _id, client } = data;
  return (
    <div className="border-b p-5 flex ">
      <p className="flex-1">
        {name}
        <span className="text-sm text-gray-500 uppercase"> {client}</span>
      </p>
      <Link
        to={`${_id}`}
        className="text-gray-600 hiver:text-gray-800 uppercase text-sm font-bold"
      >
        Ver Proyecto
      </Link>
    </div>
  );
};
export default ProjectsPreview;
