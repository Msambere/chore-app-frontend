import { Button } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import UserData from "~/types/Response/UserData";
import { useNavigate } from "react-router";

interface Props {
  setUserData: Dispatch<SetStateAction<UserData>>;
}

const LogoutButton = ({ setUserData }: Props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserData({
      message: "",
      userId: 0,
      firstName: "",
      lastName: "",
      email: "",
      username: "Not logged in",
      chores: [],
      missions: [],
      rewards: [],
    });
    navigate("/");
  };

  return <Button onClick={handleLogout}>Log Out</Button>;
};

export default LogoutButton;
