import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import RewardResponse from "~/types/Response/RewardResponse";

interface Props {
  reward: RewardResponse;
}

export default function SingleRewardDetails({ reward }: Props) {
  return (
    <List disablePadding>
      {reward.description && (
        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemText
            primary={
              <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                Description
              </Typography>
            }
            secondary={reward.description}
          />
        </ListItem>
      )}

      <ListItem disablePadding>
        <ListItemText
          primary={
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              In Mission
            </Typography>
          }
          secondary={reward.inMission ? "Yes" : "No"}
        />
      </ListItem>
    </List>
  );
}
