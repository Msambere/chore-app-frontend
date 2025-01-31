import React, { useCallback } from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import StyledContainer from "~/Components/UserProfilePage/Boxes/StyledContainer";
import StyledAvatar from "~/Components/UserProfilePage/Boxes/StyledAvatar";
import PointsSummary from "~/Components/UserProfilePage/Boxes/PointSummary";
import UserData from "~/types/Response/UserData";

export interface UserProfileInfoBoxProps {
  user?: UserData;
}
const UserProfileInfoBox = ({ user }: UserProfileInfoBoxProps) => {
  const getInitials = useCallback(() => {
    const firstInitial = user?.firstName?.charAt(0).toUpperCase() || "";
    const lastInitial = user?.lastName.charAt(0).toUpperCase() || "";
    return `${firstInitial}${lastInitial}`;
  }, [user]);

  const fullName = useCallback(() => {
    return `${user?.firstName || ""} ${user?.lastName || ""}`.trim();
  }, [user]);

  if (!user) {
    return (
      <StyledContainer>
        <Typography color="error">Required user information missing</Typography>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <Tooltip title={fullName()} arrow placement="top">
        <StyledAvatar>{getInitials()}</StyledAvatar>
      </Tooltip>
      <div className={"p14"}>
        <Typography
          variant="h5"
          component="h1"
          sx={{ fontWeight: "bold" }}
          gutterBottom
        >
          {fullName()}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ wordBreak: "break-word"}}
        >
          @{user.username}
        </Typography>
      </div>
      <div className={"mt-2"}>
        <PointsSummary user={user} />
      </div>
    </StyledContainer>
  );
};

export default React.memo(UserProfileInfoBox);
