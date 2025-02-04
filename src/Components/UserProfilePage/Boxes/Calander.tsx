import React, { FC } from "react";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

// MUI X imports
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";

// MUI base
import { styled } from "@mui/material/styles";
import StyledContainer from "./StyledContainer";

export interface DateRange {
  start: Date;
  end: Date;
  color: string;
}

interface CalendarViewProps {
  dateRanges: DateRange[];
}

/**
 * A styled PickersDay that can receive a `bgColor` prop
 * and apply it as the background color for that day.
 */
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

/**
 * Displays a month calendar, highlighting any day that falls within
 * any of the provided date ranges in 'dateRanges'.
 */
const CalendarView: FC<CalendarViewProps> = ({ dateRanges }) => {
  /**
   * Checks if 'day' (a Dayjs object) is within any of the dateRanges.
   * If so, returns the color of the first matching range.
   */
  const getDayColor = (day: Dayjs): string | undefined => {
    for (const range of dateRanges) {
      const start = dayjs(range.start);
      const end = dayjs(range.end);
      if (day.isBetween(start, end, "day", "[]")) {
        return range.color;
      }
    }
    return undefined;
  };

  return (
    <StyledContainer>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          displayStaticWrapperAs={"desktop"}
          readOnly={true}
          slots={{
            day: (dayProps: PickersDayProps<Dayjs>) => {
              const { day, selected, ...other } = dayProps;
              const bgColor = getDayColor(day)!;
              return (
                <CustomPickersDay
                  {...other}
                  day={day}
                  selected={selected}
                  // @ts-expect-error it exists
                  bgColor={bgColor}
                />
              );
            },
          }}
        />
      </LocalizationProvider>
    </StyledContainer>
  );
};

export default CalendarView;
