import UserData from "~/types/Response/UserData";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import Container from "@mui/material/Container";
import { Grid2 as Grid } from "@mui/material";
import UserProfileInfoBox from "~/Components/UserProfilePage/Boxes/UserProfileInfoBox";
import { Charts } from "~/Components/UserProfilePage/Boxes/Charts";

interface UserProfileViewProps {
  userData?: UserData | undefined;
}

const UserProfileView = ({ userData }: UserProfileViewProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate("/Login");
    }
  }, [userData]);

  return (
    <Container fixed>
      <Grid container spacing={1}>
        <Grid size={4}>
          <UserProfileInfoBox
            username={userData?.username}
            firstName={userData?.firstName}
            lastName={userData?.lastName}
          />
        </Grid>
        <Grid size={5}>
          <Charts
            data={[
              {
                id: 1,
                label: "Easy",
                value: 10,
                color: "green",
              },
              {
                id: 2,
                label: "Medium",
                value: 50,
                color: "blue",
              },
              {
                id: 3,
                label: "Hard",
                value: 40,
                color: "red",
              },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfileView;
