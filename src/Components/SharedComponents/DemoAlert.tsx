import { Alert, AlertTitle, Typography } from "@mui/material";

export default function DemoAlert() {
  return (
    <Alert
      severity="warning"
      variant="outlined"
      elevation={3}
      color={"warning"}
      icon={false}
      style={{ alignItems: "center" }}
      sx={{
        maxWidth: 0.7,
        margin: "auto",
        marginBottom: 4,
        marginTop: 4,
        borderRadius: "8px",
      }}
    >
      <AlertTitle variant={"h2"}> ⚠️ Demo Website Disclaimer ⚠️ </AlertTitle>
      <Typography variant={"body1"}>
        This is a demo version of the ChoreChamp web application. It is intended
        for demonstration and development purposes only.
        <ul>
          <li> Do NOT enter any personal, private, or secure information.</li>
          <li> No real data security measures are implemented.</li>
          <li>
            This demo may be accessed by multiple users. Please be mindful and
            respectful when using the app.{" "}
          </li>
        </ul>
        Thank you for understanding and using ChoreChamp responsibly!
      </Typography>
    </Alert>
  );
}
