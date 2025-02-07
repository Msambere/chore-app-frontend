import { Dispatch, SetStateAction, useEffect } from "react";
import RewardList from "~/Components/RewardsPage/RewardList";
import UserData from "~/types/Response/UserData";
import { useNavigate } from "react-router";
interface RewardsProps {
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
}

const RewardsView = ({ userData, setUserData }: RewardsProps) => {
  return <RewardList userData={userData} setUserData={setUserData} />;
};

export default RewardsView;
