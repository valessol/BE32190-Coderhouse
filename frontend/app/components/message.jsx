const Message = ({ text, type = "error" }) => {
  return (
    <div
      className={`text-center my-4 text-white p-3 uppercase rounded text-lg ${
        type === "error" ? " bg-red-600" : "bg-green-600"
      }`}
    >
      {text}
    </div>
  );
};

export default Message;
