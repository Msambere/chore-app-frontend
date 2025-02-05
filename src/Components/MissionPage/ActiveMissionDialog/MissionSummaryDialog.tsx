import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography, Box,
} from "@mui/material";
import { formatTime } from "~/Helper Functions/FormatTime";

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
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
        🏆 Mission Summary
      </DialogTitle>

      <DialogContent>
        {/* Mission Details */}
        <Box sx={{ mb: 2, p: 2, backgroundColor: "#e3f2fd", borderRadius: 2 }}>
          <Typography variant="body1">
            <strong>Total Chores Completed:</strong> {totalChoresCompleted}
          </Typography>
          <Typography variant="body1">
            <strong>Remaining Points:</strong> {pointTotal}
          </Typography>
          <Typography variant="body1">
            <strong>Time Elapsed:</strong> {formatTime(timeElapsed, true)}
          </Typography>
        </Box>
      </DialogContent>

      {/* Action Buttons */}
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
          Go to User Profile
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MissionSummaryDialog;
