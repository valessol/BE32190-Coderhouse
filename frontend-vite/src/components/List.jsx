const List = ({ data, options }) => {
  const { title, Component } = options;
  return (
    <>
      <h2 className="text-6xl text-center font-black text-amber-500 mt-0 mb-20 mx-0">
        {title}
      </h2>

      {data?.length && (
        <div className="grid gap-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.map((d) => (
            <Component key={d.url} data={d} />
          ))}
        </div>
      )}
    </>
  );
};

export default List;
