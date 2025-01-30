import React, { useMemo } from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import { StyledContainer } from "~/Components/UserProfilePage/Boxes/StyledContainer";
import { StyledAvatar } from "~/Components/UserProfilePage/Boxes/StyledAvatar";

export interface UserProfileInfoBoxProps {
  username?: string;
  firstName?: string;
  lastName?: string;
}
const UserProfileInfoBox = ({
  username,
  firstName,
  lastName,
}: UserProfileInfoBoxProps) => {
  const getInitials = useMemo(() => {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
    return `${firstInitial}${lastInitial}`;
  }, [firstName, lastName]);

  const fullName = useMemo(() => {
    return `${firstName || ""} ${lastName || ""}`.trim();
  }, [firstName, lastName]);

  if (!username || !firstName) {
    return (
      <StyledContainer elevation={2}>
        <Typography color="error">Required user information missing</Typography>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer
      elevation={2}
      role="article"
      aria-label={`Profile information for ${fullName}`}
    >
      <Tooltip title={fullName} arrow placement="top">
        <StyledAvatar
          alt={`${fullName}'s profile picture`}
          sx={{
            bgcolor: "#45B7D1",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          {getInitials}
        </StyledAvatar>
      </Tooltip>

      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{ fontWeight: "bold" }}
          gutterBottom
        >
          {fullName}
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ wordBreak: "break-word" }}
        >
          @{username}
        </Typography>
      </Box>
    </StyledContainer>
  );
};

export default React.memo(UserProfileInfoBox);
