import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
// import { useNavigate } from "react-router";

interface MissionSummaryDialogProps {
  open: boolean;
  onClose: () => void;
  pointTotal: number;
  timeElapsed: number;
  totalChoresCompleted: number;
  handleFinalizeMission: () => void;
}

const MissionSummaryDialog = ({
  open,
  onClose,
  pointTotal,
  timeElapsed,
  totalChoresCompleted,
  handleFinalizeMission,
}: MissionSummaryDialogProps) => {
  // const navigate = useNavigate();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle tabIndex={-1} autoFocus>
        Mission Summary
      </DialogTitle>
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
          onClick={handleFinalizeMission}
          color="secondary"
        >
          User Profile
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MissionSummaryDialog;
