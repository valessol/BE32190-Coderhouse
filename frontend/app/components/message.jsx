const Message = ({ children, type = "error" }) => {
  return (
    <div
      className={`text-center my-4 text-white font-bold p-3 uppercase ${
        type === "error" ? " bg-red-600" : "bg-green-600"
      }`}
    >
      {children}
    </div>
  );
};

export default Message;
