const Alert = ({ alert, cssStyles }) => {
  const messageClass = {
    error: "from-red-400 to-red-600",
    success: "from-teal-400 to-teal-600",
  };

  return (
    <div
      className={`${
        messageClass[alert.type]
      } bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-xl my-10 ${
        cssStyles ? cssStyles : ""
      }`}
    >
      {alert.msg}
    </div>
  );
};
export default Alert;
