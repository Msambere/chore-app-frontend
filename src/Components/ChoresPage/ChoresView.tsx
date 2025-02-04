import UserData from "~/types/Response/UserData";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router";
import ChoreList from "~/Components/ChoresPage/ChoreList";

interface ChoresProps {
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
}

const ChoresView = ({ userData, setUserData }: ChoresProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(userData.username);
    if (userData.username === "") {
      navigate("/");
    }
  }, []);
  return <ChoreList userData={userData} setUserData={setUserData} />;
};

export default ChoresView;
