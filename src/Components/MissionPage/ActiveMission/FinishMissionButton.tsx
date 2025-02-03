import { Button } from "@mui/material";

interface FinishMissionButtonProps {
  onFinishMission: () => void;
}

const FinishMissionButton = ({ onFinishMission }: FinishMissionButtonProps) => {
  return (
    <Button
      variant="contained"
      color="error"
      fullWidth
      sx={{ mt: 2 }}
      onClick={onFinishMission}
    >
      Finish Mission
    </Button>
  );
};

export default FinishMissionButton;