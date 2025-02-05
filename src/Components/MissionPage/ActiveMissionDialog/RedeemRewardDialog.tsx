import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import RewardResponse from "~/types/Response/RewardResponse";

interface RedeemRewardDialogProps {
  open: boolean;
  onClose: () => void;
  rewards: RewardResponse[];
  pointTotal: number;
  onRedeemReward: (rewardId: number) => void;
}

const RedeemRewardDialog: React.FC<RedeemRewardDialogProps> = ({
  open,
  onClose,
  rewards,
  pointTotal,
  onRedeemReward,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
        🎁 Select a Reward to Redeem
      </DialogTitle>
      <DialogContent>
        <Typography
          variant="body1"
          sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}
        >
          You have <strong>{pointTotal}</strong> points available.
        </Typography>

        <List>
          {rewards.length === 0 ? (
            <ListItem>
              <ListItemText primary="No rewards available to redeem." />
            </ListItem>
          ) : (
            rewards.map((reward) => {
              const isRedeemable = reward.pointsNeeded <= pointTotal;
              return (
                <ListItem
                  key={reward.rewardId}
                  sx={{
                    bgcolor: isRedeemable ? "#e3f2fd" : "#f5f5f5",
                    borderRadius: 2,
                    mb: 1,
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    minHeight: "60px",
                  }}
                >
                  <Box
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="body1" fontWeight="bold">
                      {reward.name}
                    </Typography>
                    <Typography variant="body2">
                      Points Needed: {reward.pointsNeeded}
                    </Typography>
                  </Box>

                  {/* Redeem Button on the Right */}
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => onRedeemReward(reward.rewardId)}
                      disabled={!isRedeemable}
                      sx={{
                        minWidth: "100px",
                        fontWeight: "bold",
                        alignSelf: "flex-end", // Moves button to the end
                      }}
                    >
                      {isRedeemable ? "Redeem" : "Not Enough Points"}
                    </Button>
                  </Box>
                </ListItem>
              );
            })
          )}
        </List>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button
          onClick={onClose}
          color="secondary"
          variant="outlined"
          sx={{ borderRadius: 2, fontWeight: "bold", width: "150px" }}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RedeemRewardDialog;
