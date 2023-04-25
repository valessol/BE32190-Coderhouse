const Course = ({ imageUrl }) => {
  return (
    <section className="curso">
      <style jsx="true">
        {`
          .curso {
            background-image: linear-gradient(
                to right,
                rgb(0 0 0 / 0.65),
                rgb(0 0 0 / 0.7)
              ),
              url(${imageUrl});
          }
        `}
      </style>
      <div className="contenedor curso-grid">
        <div className="contenido">
          <h2 className="heading">Cursos con hasta 30% de descuento</h2>
          <p className="texto">
            Latin words, consectetur, from a Lorem Ipsum passage, and going
            through the cites of the word in classical literature, discovered
            the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
            1.10.33 of "de Finibus Bonorum et Malorum"
          </p>
        </div>
      </div>
    </section>
  );
};

export default Course;
