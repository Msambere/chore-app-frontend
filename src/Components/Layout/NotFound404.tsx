import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import "./NotFound404.css";

const NotFound404 = () => {
  const navigate = useNavigate();
  return (
    <main>
      <h1>404</h1>
      <h2>Uh Oh! This page does not exist.</h2>
      <Button onClick={() => navigate("/UserProfile")} variant="contained">
        Go Back
      </Button>
    </main>
  );
};
export default NotFound404;
