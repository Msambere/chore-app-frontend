import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";

interface MissionSummaryDialogProps {
  open: boolean;
  onClose: () => void;
  pointTotal: number;
  totalUnredeemedPoints: number;
  timeElapsed: number;
  totalChoresCompleted: number;
  onRedeem: () => void;
}

const MissionSummaryDialog = ({
  open,
  onClose,
  pointTotal,
  totalUnredeemedPoints,
  timeElapsed,
  totalChoresCompleted,
  onRedeem,
}: MissionSummaryDialogProps) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Mission Summary</DialogTitle>
      <DialogContent>
        <Typography>Total Chores Completed: {totalChoresCompleted}</Typography>
        <Typography>Total Points Earned: {pointTotal}</Typography>
        <Typography>
          Time Elapsed: {Math.floor(timeElapsed / 60)} mins {timeElapsed % 60}{" "}
          secs
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{ display: "flex", flexDirection: "column", gap: 1, p: 2 }}
      >
        <Button
          fullWidth
          variant="contained"
          onClick={onClose}
          color="primary"
          disabled={pointTotal === 0}
        >
          Claim Reward
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => navigate("/")}
          color="secondary"
        >
          User Profile
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MissionSummaryDialog;
