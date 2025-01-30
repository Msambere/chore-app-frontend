import UserData from "~/types/Response/UserData";
import { useNavigate } from "react-router";
import { useEffect } from "react";

interface UserProfileViewProps {
  userData?: UserData | undefined;
}

const UserProfileView = ({ userData }: UserProfileViewProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate("/Login");
    }
  }, [userData]);

  return <h1>This is were the User Profile components will go</h1>;
};

export default UserProfileView;
