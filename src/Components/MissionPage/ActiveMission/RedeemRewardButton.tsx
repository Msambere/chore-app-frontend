import React, { useState } from "react";
import { Button } from "@mui/material";
import RedeemRewardDialog from "~/Components/MissionPage/ActiveMissionDialog/RedeemRewardDialog";
import RewardResponse from "~/types/Response/RewardResponse";

interface RedeemRewardButtonProps {
  pointTotal: number;
  rewards: RewardResponse[];
  onRedeem: (rewardId: number) => void;
}

const RedeemRewardButton = ({
  pointTotal,
  rewards,
  onRedeem,
}: RedeemRewardButtonProps) => {
  const [redeemDialogOpen, setRedeemDialogOpen] = useState(false);
  const availableRewards = rewards.filter(
    (reward) => reward.pointsNeeded <= pointTotal,
  );

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          mt: 2,
          borderRadius: 2,
          fontWeight: "bold",
        }}
        onClick={() => setRedeemDialogOpen(true)}
        disabled={availableRewards.length === 0}
      >
        Redeem Reward
      </Button>

      {/* Dialog for reward redemption */}
      <RedeemRewardDialog
        open={redeemDialogOpen}
        onClose={() => setRedeemDialogOpen(false)}
        rewards={availableRewards}
        pointTotal={pointTotal}
        onRedeemReward={onRedeem}
      />
    </>
  );
};

export default RedeemRewardButton;
