import React, { Dispatch, JSX, SetStateAction, useEffect } from "react";
import ActiveMission from "~/Components/MissionPage/ActiveMission/ActiveMission";
import MissionForm from "~/Components/MissionPage/MissionForm/MissionForm";
import MissionChoreResponse from "~/types/Response/MissionChoreResponse";
import UserData from "~/types/Response/UserData";
import { useNavigate } from "react-router";

interface MissionProps {
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
  setStartMission: Dispatch<SetStateAction<boolean>>;
  startMission: boolean;
  missionChores: MissionChoreResponse[];
  setMissionChores: Dispatch<SetStateAction<MissionChoreResponse[]>>;
}

const MissionView = ({
  userData,
  setUserData,
  setStartMission,
  startMission,
  missionChores,
  setMissionChores,
}: MissionProps): JSX.Element => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(userData.username);
    if (userData.username === "") {
      navigate("/");
    }
  }, []);

  return (
    <main>
      {startMission ? (
        <ActiveMission
          missionChores={missionChores}
          userData={userData}
          setUserData={setUserData}
        />
      ) : (
        <MissionForm
          setStartMission={setStartMission}
          setMissionChores={setMissionChores}
          userData={userData}
          setUserData={setUserData}
        />
      )}
    </main>
  );
};

export default MissionView;
