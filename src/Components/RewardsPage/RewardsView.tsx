import { Dispatch, SetStateAction } from "react";
import RewardList from "~/Components/RewardsPage/RewardList";
import UserData from "~/types/Response/UserData";
interface RewardsProps {
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
}

const RewardsView = ({ userData, setUserData }: RewardsProps) => {
  return <RewardList userData={userData} setUserData={setUserData} />;
};

export default RewardsView;
