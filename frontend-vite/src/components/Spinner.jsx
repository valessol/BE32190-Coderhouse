const Spinner = ({ text, style }) => {
  const spinnerStyle = {
    margin: "20px auto",
    width: "40px",
    height: "40px",
    position: "relative",
    ...style,
  };

  return (
    <>
      {text && (
        <p className="block text-center my-5 text slate-500 uppercase text-sm">
          {text}
        </p>
      )}
      <div className="sk-circle" style={spinnerStyle}>
        <div className="sk-circle1 sk-child"></div>
        <div className="sk-circle2 sk-child"></div>
        <div className="sk-circle3 sk-child"></div>
        <div className="sk-circle4 sk-child"></div>
        <div className="sk-circle5 sk-child"></div>
        <div className="sk-circle6 sk-child"></div>
        <div className="sk-circle7 sk-child"></div>
        <div className="sk-circle8 sk-child"></div>
        <div className="sk-circle9 sk-child"></div>
        <div className="sk-circle10 sk-child"></div>
        <div className="sk-circle11 sk-child"></div>
        <div className="sk-circle12 sk-child"></div>
      </div>
    </>
  );
};
export default Spinner;
