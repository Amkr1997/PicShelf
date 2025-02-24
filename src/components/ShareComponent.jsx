import { useState } from "react";
import styles from "../css/albums.module.css";
import {
  useGetAllUsersQuery,
  useGetProfileInfoQuery,
  useShareAlbumMutation,
} from "../features/apiSlice";
import { toast } from "react-toastify";

const ShareComponent = ({ album }) => {
  const [email, setEmail] = useState([]);
  const { data: singleUserId, isLoading: singleLoading } =
    useGetProfileInfoQuery();
  const { data: users, isLoading, isError, error } = useGetAllUsersQuery();
  const [shareAlbum] = useShareAlbumMutation();

  const filteredUsers = users?.filter((user) => user?._id !== singleUserId);

  const emailChangeHandler = (e) => {
    const { checked, value } = e.target;

    checked
      ? setEmail((prev) => [...prev, value])
      : setEmail((prev) => [...prev].filter((e) => e !== value));
  };

  const updateHandler = async (e) => {
    e.preventDefault();

    try {
      if (email.length > 0) {
        await shareAlbum({
          albumId: album?._id,
          userId: singleUserId,
          dataToShare: { sharedUsers: email },
        }).unwrap();

        toast.success("Album shared successfully");
      } else {
        toast.warn("Choose email first");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form className={`${styles.shareContainer}`} onSubmit={updateHandler}>
      <div className="pt-0 pb-3 d-flex align-items-center justify-content-evenly flex-wrap">
        {isError && <h2 className="text-center">{error?.message}</h2>}
        {!isLoading && !singleLoading ? (
          filteredUsers?.length > 0 ? (
            filteredUsers?.map((user) => {
              if (user?._id !== singleUserId) {
                return (
                  <div className="form-check d-flex gap-1" key={user?._id}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="email"
                      value={user?.email}
                      checked={email.includes(user?.email)}
                      onChange={emailChangeHandler}
                    />
                    {user?.name}
                  </div>
                );
              }
            })
          ) : (
            <h4 className="text-center">No Users to share</h4>
          )
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
    </form>
  );
};

export default ShareComponent;
