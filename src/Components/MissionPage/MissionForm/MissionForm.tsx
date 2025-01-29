import MissionChoreResponse from "~/types/Response/MissionChoreResponse";
import { Dispatch, SetStateAction } from "react";

interface MissionProps {
  setMissionChores: Dispatch<SetStateAction<MissionChoreResponse[]>>;
  setStartMission: Dispatch<SetStateAction<boolean>>;
}
const MissionForm = (props: MissionProps) => {
  // const handleSubmit =(): MissionRequest =>{
  // make api Post request
  // setStartMission to true
  // return MissionChores
  // }

  const handleStartMission = () => {
    props.setStartMission(true);
    console.log("Mission Chores will get set");
    props.setMissionChores([]);
  };

  return (
    <>
      <h1>This is where mission form components will be.</h1>
      <button onClick={handleStartMission}>Start Mission</button>
    </>
  );
};

export default MissionForm;
