const Fields = ({ options, onChange, prevData }) => {
  const { fields, submitText, linkText, linkUrl } = options;
  return (
    <>
      {fields.map((item) => {
        const { label, id, type, placeholder } = item;
        return (
          <div className="mb-4" key={id}>
            <label className="text-gray-800 text-2xl" htmlFor={id}>
              {label}:
            </label>
            {type === "textarea" ? (
              <textarea
                id={id}
                type="text"
                className="mt-2 block w-full p-3 bg-gray-50 h-40 align-self text-2xl"
                placeholder={placeholder}
                onChange={onChange}
                name={id}
                defaultValue={prevData && prevData[id]}
              />
            ) : (
              <input
                id={id}
                type={type}
                className="mt-2 block w-full p-3 bg-gray-50 text-2xl"
                placeholder={placeholder}
                onChange={onChange}
                name={id}
                defaultValue={prevData && prevData[id]}
              />
            )}
          </div>
        );
      })}
      {/* <button
        type="submit"
        className="mt-5 w-full bg-[#e99401] p-3 uppercase font-bold text-3xl text-white"
      >
        {submitText}
      </button>
      <Link
        to={linkUrl}
        className="text-center text-[#e99401] block text-xl mt-2"
      >
        {linkText}
      </Link> */}
    </>
  );
};
export default Fields;
