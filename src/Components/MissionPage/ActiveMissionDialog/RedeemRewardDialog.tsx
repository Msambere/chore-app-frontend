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
} from "@mui/material";
import RewardResponse from "~/types/Response/RewardResponse";

interface RedeemRewardDialogProps {
  open: boolean;
  onClose: () => void;
  rewards: RewardResponse[];
  pointTotal: number;
  onRedeemReward: (rewardId: number) => void;
}

const RedeemRewardDialog: React.FC<RedeemRewardDialogProps> = ({ open, onClose, rewards, pointTotal, onRedeemReward }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Select a Reward to Redeem</DialogTitle>
      <DialogContent>
        <List>
          {rewards.length === 0 ? (
            <ListItem>
              <ListItemText primary="No rewards available to redeem." />
            </ListItem>
          ) : (
            rewards.map((reward) => (
              <ListItem key={reward.rewardId} button onClick={() => onRedeemReward(reward.rewardId)} disabled={reward.pointsNeeded > pointTotal}>
                <ListItemText
                  primary={reward.name}
                  secondary={`Points Needed: ${reward.pointsNeeded}`}
                />
              </ListItem>
            ))
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RedeemRewardDialog;