import { Dispatch, ReactElement, SetStateAction, useEffect } from "react";
import { useState } from "react";
import ActiveMission from "~/Components/MissionPage/ActiveMission/ActiveMission";
import MissionForm from "~/Components/MissionPage/MissionForm/MissionForm";
import MissionChoreResponse from "~/types/Response/MissionChoreResponse";
import UserData from "~/types/Response/UserData";
import { useNavigate } from "react-router";

interface MissionProps {
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
}

const MissionView = ({
  userData,
  setUserData,
}: MissionProps): ReactElement<string> => {
  const [startMission, setStartMission] = useState<boolean>(false);
  const [missionChores, setMissionChores] = useState<MissionChoreResponse[]>(
    [],
  );
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
        <ActiveMission missionChores={missionChores} />
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
