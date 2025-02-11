import React, { FC, useMemo } from "react";
import dayjs, { Dayjs } from "dayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { styled } from "@mui/material/styles";
import UserData from "~/types/Response/UserData";
import MissionResponse from "~/types/Response/MissionResponse";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(dayjs.tz.guess());
export interface DateRange {
  start: Date;
  end: Date;
  color: string;
}

interface CalendarViewProps {
  missions: UserData["missions"];
}

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "bgColor",
})<{ bgColor?: string }>(({ bgColor }) => ({
  ...(bgColor && {
    backgroundColor: bgColor,
    color: "#fff",
    "&:hover": {
      backgroundColor: bgColor,
      opacity: 0.9,
    },
  }),
})) as typeof PickersDay;

const buildMissionDateRanges = (missions: MissionResponse[]): DateRange[] => {
  return missions?.map((mission) => ({
    start: dayjs(mission.dateStarted).toDate(),
    end: dayjs(mission.dateStarted).add(mission.timeLimit, "minutes").toDate(),
    color: getMissionColor(mission),
  }));
};

const getMissionColor = (mission: MissionResponse): string => {
  const percentCompleted = getMissionProgress(mission);
  if (percentCompleted === -1) return "#bdbdbd";
  if (percentCompleted === 100) return "#66BB6A";
  if (percentCompleted >= 50) return "#FFA726";
  if (percentCompleted > 0) return "#FF7043";
  return "#EF5350";
};

const getMissionProgress = (mission: MissionResponse): number => {
  const { missionChores } = mission;
  if (!missionChores || missionChores.length === 0) return -1;

  let completedMinutes = 0;
  let totalMinutes = 0;
  missionChores.forEach((chore) => {
    totalMinutes += chore.duration;
    if (chore.completed) {
      completedMinutes += chore.duration;
    }
  });

  return (completedMinutes / totalMinutes) * 100;
};

/**
 * Displays a calendar highlighting mission progress with existing color logic.
 */
const CalendarCard: FC<CalendarViewProps> = ({ missions }) => {
  const dateRanges = useMemo(
    () => buildMissionDateRanges(missions),
    [missions],
  );

  // Overlap-based day coloring
  const getDayColor = (day: Dayjs): string | undefined => {
    for (const range of dateRanges) {
      const missionStart = dayjs(range.start);
      if (day.isSame(missionStart, "day")) {
        return range.color;
      }
    }
    return undefined;
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        displayStaticWrapperAs={"desktop"}
        readOnly={true}
        slots={{
          day: (dayProps: PickersDayProps<Dayjs>) => {
            const { day, selected, ...other } = dayProps;
            const bgColor = getDayColor(day);
            return (
              <CustomPickersDay
                {...other}
                day={day}
                selected={selected}
                // @ts-expect-error bgColor it exists
                bgColor={bgColor}
              />
            );
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default CalendarCard;
