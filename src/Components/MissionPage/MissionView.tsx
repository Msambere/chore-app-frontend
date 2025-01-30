import { ReactElement } from "react";
import { useState } from "react";
import ActiveMission from "~/Components/MissionPage/ActiveMission/ActiveMission";
import MissionFormv2 from "~/Components/MissionPage/MissionForm/MissionFormv2";
import MissionChoreResponse from "~/types/Response/MissionChoreResponse";
import UserData from "~/types/Response/UserData";

interface MissionProps {
  userData: UserData;
}

const MissionView = ({ userData }: MissionProps): ReactElement<string> => {
  const [startMission, setStartMission] = useState<boolean>(false);
  const [missionChores, setMissionChores] = useState<MissionChoreResponse[]>(
    [],
  );
  return (
    <main>
      {startMission ? (
        <ActiveMission missionChores={missionChores} />
      ) : (
        <MissionFormv2
          setStartMission={setStartMission}
          setMissionChores={setMissionChores}
          userData={userData}
        />
      )}
    </main>
  );
};

export default MissionView;
