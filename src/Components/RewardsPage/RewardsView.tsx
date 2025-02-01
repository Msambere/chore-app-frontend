import { Dispatch, ReactElement, SetStateAction, useEffect } from "react";
import RewardList from "~/Components/RewardsPage/RewardList";
import UserData from "~/types/Response/UserData";
import { useNavigate } from "react-router";
interface RewardsProps {
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
}

const RewardsView = ({ userData, setUserData }: RewardsProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (userData.username === "Not logged in") {
      navigate("/");
    }
  }, [userData]);
  return <RewardList userData={userData} setUserData={setUserData} />;
};

export default RewardsView;
