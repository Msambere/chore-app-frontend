import React, { Dispatch, SetStateAction } from "react";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  ButtonGroup,
  Container,
  List,
  ListItem,
  ListItemText,
  Rating,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Star } from "@mui/icons-material";
import ChoreResponse from "~/types/Response/ChoreResponse";
import { deleteEntityApiCall } from "~/Helper Functions/ApiCalls";
import UserData from "~/types/Response/UserData";

interface ChoreProps {
  chore: ChoreResponse;
  setUserData: Dispatch<SetStateAction<UserData>>;
}

function SingleChore({ chore, setUserData }: ChoreProps) {
  const handleDelete = async () => {
    deleteEntityApiCall("chores", chore.choreId)
      .then(() => {
        setUserData((prevState: UserData) => ({
          ...prevState,
          chores: prevState.chores.filter((oldChore) => oldChore !== chore),
        }));
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Box sx={{ mb: 1 }}>
        <Container maxWidth="sm">
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography component="section">{chore?.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/*Description*/}
              <List>
                <ListItem>
                  <ListItemText
                    primary={`Description`}
                    secondary={chore?.description}
                  />
                </ListItem>
              </List>

              {/*Recurrence*/}
              <List>
                <ListItem>
                  <ListItemText
                    primary={`Recurrence`}
                    secondary={chore?.recurrence}
                  />
                </ListItem>
              </List>

              {/*category*/}
              <List>
                <ListItem>
                  <ListItemText
                    primary={`Category`}
                    secondary={chore?.category}
                  />
                </ListItem>
              </List>

              {/*duration*/}
              <List>
                <ListItem>
                  <ListItemText
                    primary={`Duration`}
                    secondary={chore?.duration}
                  />
                </ListItem>
              </List>

              {/*Difficulty*/}
              <List>
                <ListItem>
                  <ListItemText
                    primary={`Difficulty`}
                    secondary={
                      <Rating
                        name="hover-feedback"
                        value={chore?.difficulty}
                        precision={0.5}
                        readOnly
                        emptyIcon={
                          <Star style={{ opacity: 0.55 }} fontSize="inherit" />
                        }
                      />
                    }
                  />
                </ListItem>
              </List>
            </AccordionDetails>
            <AccordionActions>
              <ButtonGroup>
                <Button>Edit</Button>
                <Button onClick={handleDelete}>Delete</Button>
              </ButtonGroup>
            </AccordionActions>
          </Accordion>
        </Container>
      </Box>
    </>
  );
}
export default SingleChore;
