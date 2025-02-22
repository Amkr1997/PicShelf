const Loader = () => {
  const loaderArr = Array.from({ length: 8 });

  return (
    <>
      {loaderArr.map((_, index) => {
        return (
          <div className={`col-sm-6 col-md-4 col-lg-3 mb-3`} key={index}>
            <div className="card" aria-hidden="true">
              <img
                src="https://placehold.co/600x300/#f1f3f5/white?text=LOADING"
                className="card-img-top"
                alt=""
              />
              <div className="card-body">
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
                <button
                  className="btn btn-primary disabled placeholder col-6"
                  aria-disabled="true"
                ></button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Loader;
