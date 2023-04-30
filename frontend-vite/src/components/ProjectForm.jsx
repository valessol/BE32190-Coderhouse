import { useEffect, useState } from "react";
import { newProjectForm } from "../constants/forms";
import Alert from "./Alert";
import useProjects from "../hooks/useProjects";
import Spinner from "./Spinner";
import { useNavigate, useParams } from "react-router-dom";

const ProjectForm = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    finishDate: "",
    client: "",
  });
  // const [alert, setAlert] = useState({});
  const { submitProject, project, loading, alert, setAlert } = useProjects();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params?.id && project) {
      const finishDate = project.finishDate.split("T")[0];
      setValues({ ...project, finishDate });
    }
  }, [params]);

  const handleChange = (e) => {
    setAlert({});
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allFieldsCompleted = !Object.values(values).includes("");

    if (!allFieldsCompleted) {
      setAlert({
        msg: "Todos los campos son obligatorios",
        type: "error",
      });
      return;
    }

    await submitProject(values);
    setTimeout(() => {
      setAlert({});
      navigate("/proyectos");
    }, 3000);
    setValues({
      name: "",
      description: "",
      finishDate: "",
      client: "",
    });
  };
  console.log({ alert });
  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {alert?.msg && <Alert alert={alert} cssStyles="mt-0" />}
      {newProjectForm.map((item) => {
        const { label, id, type, placeholder } = item;
        return (
          <div key={id}>
            <label
              className="text-gray-700 uppercase font-bold text-sm"
              htmlFor={id}
            >
              {label}:
            </label>
            {type === "textarea" ? (
              <textarea
                id={id}
                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder={placeholder}
                onChange={handleChange}
                name={id}
                value={values[id]}
              />
            ) : (
              <input
                id={id}
                type={type}
                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder={placeholder || null}
                onChange={handleChange}
                name={id}
                value={values[id]}
              />
            )}
          </div>
        );
      })}

      {loading ? (
        <button
          type="submit"
          className="bg-sky-600 w-full p-3 mt-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
        >
          <Spinner
            style={{
              margin: "0",
              width: "24px",
              height: "24px",
              display: "inline-block",
              color: "white",
            }}
          />
        </button>
      ) : (
        <button
          type="submit"
          className="bg-sky-600 w-full p-3 mt-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
        >
          {params?.id ? "Actualizar Proyecto" : "Crear Proyecto"}
        </button>
      )}
    </form>
  );
};
export default ProjectForm;
