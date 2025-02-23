const Loader = () => {
  const loaderArr = Array.from({ length: 8 });

  return (
    <>
      {loaderArr.map((_, index) => {
        return (
          <div
            className={`col-sm-6 col-lg-4 col-xl-3 mb-3`}
            key={index}
            style={{ height: "25rem" }}
          >
            <div className="card" aria-hidden="true">
              <img
                src="https://placehold.co/600x300/#f1f3f5/white?text=LOADING"
                className="card-img-top"
                alt=""
              />
              <div className="card-body">
                <button
                  className="btn btn-danger disabled placeholder col-6"
                  aria-disabled="true"
                ></button>
                <h5 className="card-title placeholder-glow">
                  <span className="placeholder col-6"></span>
                </h5>
                <p className="card-text placeholder-glow">
                  <span className="placeholder col-7"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-6"></span>
                  <span className="placeholder col-8"></span>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Loader;
