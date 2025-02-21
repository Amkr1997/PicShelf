import NavbarResponsive from "../components/NavbarResponsive";
import { useGetProfileInfoQuery } from "../features/apiSlice";

const Profile = () => {
  const { data: loginedUserId } = useGetProfileInfoQuery();

  return (
    <>
      <NavbarResponsive />
    </>
  );
};

export default Profile;
