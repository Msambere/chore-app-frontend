import React, { Dispatch, JSX, SetStateAction } from "react";
import ActiveMission from "~/Components/MissionPage/ActiveMission/ActiveMission";
import MissionForm from "~/Components/MissionPage/MissionForm/MissionForm";
import MissionChoreResponse from "~/types/Response/MissionChoreResponse";
import UserData from "~/types/Response/UserData";

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
  return (
    <main>
      {startMission ? (
        <ActiveMission
          missionChores={missionChores}
          userData={userData}
          setUserData={setUserData}
          setStartMission={setStartMission}
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
