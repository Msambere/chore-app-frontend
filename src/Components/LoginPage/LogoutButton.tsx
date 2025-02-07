import { IconButton } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import UserData from "~/types/Response/UserData";
import { useNavigate } from "react-router";
import { ExitToApp } from "@mui/icons-material";

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
      username: "",
      chores: [],
      missions: [],
      rewards: [],
    });
    localStorage.setItem("username", "");
    navigate("/");
  };

  return (
    <IconButton onClick={handleLogout}>
      <ExitToApp />
    </IconButton>
  );
};

export default LogoutButton;
