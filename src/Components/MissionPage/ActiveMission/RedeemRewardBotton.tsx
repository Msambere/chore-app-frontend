import React from "react";
import { Button } from "@mui/material";

interface RedeemRewardButtonProps {
  pointTotal: number;
  onRedeem: () => void;
}

const RedeemRewardButton = ({
  pointTotal,
  onRedeem,
}: RedeemRewardButtonProps) => {
  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      sx={{ mt: 2 }}
      onClick={onRedeem}
      disabled={pointTotal < 1}
    >
      Redeem Reward
    </Button>
  );
};

export default RedeemRewardButton;
