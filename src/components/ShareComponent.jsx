import styles from "../css/albums.module.css";
import {
  useGetAllUsersQuery,
  useGetProfileInfoQuery,
} from "../features/apiSlice";

const ShareComponent = () => {
  const { data: singleUserId, isLoading: singleLoading } =
    useGetProfileInfoQuery();
  const { data: users, isLoading, isError, error } = useGetAllUsersQuery();

  //console.log(users);

  return (
    <div className={`${styles.shareContainer}`}>
      <div className="pt-0 pb-3 d-flex align-items-center justify-content-evenly flex-wrap">
        {isError && <h2 className="text-center">{error?.message}</h2>}
        {!isLoading && !singleLoading ? (
          users?.map((user) => {
            if (user?._id !== singleUserId) {
              return (
                <div className="form-check d-flex gap-1" key={user?._id}>
                  <input className="form-check-input" type="checkbox" />
                  User 1
                </div>
              );
            }
          })
        ) : (
          <h4 className="text-center">Loading...</h4>
        )}
      </div>
      <div className="my-1 text-center">
        <button
          className={`rounded-pill px-4 py-0 fs-5 fw-medium text-light mb-2 w-75 ${styles.shareSubmitbtn}`}
        >
          Share
        </button>
      </div>
    </div>
  );
};

export default ShareComponent;
