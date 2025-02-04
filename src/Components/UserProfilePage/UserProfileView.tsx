import UserData from "~/types/Response/UserData";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import UserProfileInfoBox from "~/Components/UserProfilePage/Boxes/UserProfileInfoBox";
import CalendarView from "~/Components/UserProfilePage/Boxes/Calander";
import MissionResponse from "~/types/Response/MissionResponse";
import dayjs from "dayjs";
import { Grid2, Toolbar } from "@mui/material";
import MissionSummary from "~/Components/UserProfilePage/Boxes/MissionSummary";

interface DateRange {
  start: Date;
  end: Date;
  color: string;
}
interface UserProfileViewProps {
  userData: UserData;
}
function getMissionColor(mission: MissionResponse): string {
  const { missionChores } = mission;
  if (!missionChores || missionChores.length === 0) {
    return "#bdbdbd"; // Gray if no chores
  }

  // Sum total minutes in mission
  const totalMinutes = missionChores.reduce((acc, c) => acc + c.duration, 0);

  // Sum only *completed* chores' minutes
  const completedMinutes = missionChores.reduce(
    (acc, c) => (c.completed ? acc + c.duration : acc),
    0,
  );

  const percentCompleted = (completedMinutes / totalMinutes) * 100;

  if (percentCompleted === 100) {
    return "#66BB6A"; // 100% => green
  } else if (percentCompleted >= 50) {
    return "#FFA726"; // 50-99% => orange
  } else if (percentCompleted > 0) {
    return "#FF7043"; // >0-49% => red-orange
  } else {
    return "#EF5350"; // 0% => red
  }
}
function buildMissionDateRanges(missions: MissionResponse[]): DateRange[] {
  const dateRanges: DateRange[] = [];

  for (const mission of missions) {
    // Parse the string dateStarted:
    const start = dayjs(mission.dateStarted);
    // Add `timeLimit` days to get end date (subtract 1 day if you want inclusive)
    const end = start.add(mission.timeLimit, "day");

    // Get color based on mission’s completion ratio
    const color = getMissionColor(mission);

    dateRanges.push({
      start: start.toDate(),
      end: end.toDate(),
      color,
    });
  }

  return dateRanges;
}

const UserProfileView = ({ userData }: UserProfileViewProps) => {
  const navigate = useNavigate();
  const [userDateRanges, setUserDateRanges] = useState<DateRange[]>([]);

  useEffect(() => {
    if (userData.username === "Not logged in") {
      navigate("/");
    } else {
      setUserDateRanges(buildMissionDateRanges(userData.missions));
    }
  }, [userData]);

  return (
    <Grid2 container spacing={20}>
      <Grid2 columns={6} alignItems={"start"}>
        <UserProfileInfoBox user={userData} />
      </Grid2>
      <Grid2 columns={8} alignItems={"start"}>
        <Toolbar />
      </Grid2>
      <Grid2 columns={6} alignItems={"end"}>
        <CalendarView dateRanges={userDateRanges} />
      </Grid2>
      <Grid2 columns={8} alignItems={"end"}>
        <MissionSummary
          mission={userData.missions
            .sort((m2, m1) => m1.missionId - m2.missionId)
            .at(0)}
        />
      </Grid2>
    </Grid2>
  );
};

export default UserProfileView;
