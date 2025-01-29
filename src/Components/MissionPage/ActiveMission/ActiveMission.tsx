import {ReactElement, useState} from "react";
import MissionChoreResponse from "~/types/Response/MissionChoreResponse";
// import MissionChoreResponse from "~/types/Response/MissionChoreResponse";

interface MissionChoresProps {
  missionChores: MissionChoreResponse[];
}
const ActiveMission = (props: MissionChoresProps): ReactElement<string> => {
  const [missionChores, setMissionChores] = useState<MissionChoreResponse[]>(props.missionChores);
  const [pointTotal, setPointTotal] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  // need a useState for progress too

  return <h1>This is were the Active Mission dashboard components go.</h1>;
};

export default ActiveMission;
