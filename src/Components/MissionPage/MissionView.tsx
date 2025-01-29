import {Dispatch, ReactElement, SetStateAction} from "react";
import { useState } from "react";
import ActiveMission from "~/Components/MissionPage/ActiveMission/ActiveMission";
import MissionForm from "~/Components/MissionPage/MissionForm/MissionForm";
import MissionChoreResponse from "~/types/Response/MissionChoreResponse";



const MissionView = (): ReactElement<string> => {
  const [startMission, setStartMission] = useState<boolean>(false);
  const [missionChores, setMissionChores] = useState<MissionChoreResponse[]>([]);
  return (
    <main>
      {startMission ?
        (< ActiveMission missionChores = {missionChores} />) :
        (< MissionForm setStartMission = {setStartMission} setMissionChores  = {setMissionChores}/>
        )}
    </main>
  )
};

export default MissionView;
