import { Button } from "@mui/material";

interface FinishMissionButtonProps {
  onFinishMission: () => void;
}

const FinishMissionButton = ({ onFinishMission }: FinishMissionButtonProps) => {
  return (
    <Button
      variant="outlined"
      color="error"
      fullWidth
      sx={{
        mt: 2,
        borderRadius: 2,
        fontWeight: "bold",
      }}
      onClick={onFinishMission}
    >
      Finish Mission
    </Button>
  );
};

export default FinishMissionButton;
