import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChoreResponse from "~/types/Response/ChoreResponse";
import { deleteEntityApiCall } from "~/Helper Functions/ApiCalls";
import UserData from "~/types/Response/UserData";
import SingleChoreDetails from "./SingleChoreDetails";
import EditChoreForm from "~/Components/ChoresPage/EditChoreForm";

interface ChoreProps {
  chore: ChoreResponse;
  setUserData: Dispatch<SetStateAction<UserData>>;
  recurrenceList: string[];
  categoryList: string[];
}

function SingleChore({
  chore,
  setUserData,
  recurrenceList,
  categoryList,
}: ChoreProps) {
  const [isEditing, setEditing] = useState<boolean>(false);

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
              <Typography component="section">{chore.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {isEditing ? (
                <EditChoreForm
                  chore={chore}
                  setUserData={setUserData}
                  setEditing={setEditing}
                  recurrenceList={recurrenceList}
                  categoryList={categoryList}
                />
              ) : (
                <SingleChoreDetails
                  chore={chore}
                  setEditing={setEditing}
                  handleDelete={handleDelete}
                />
              )}
            </AccordionDetails>
          </Accordion>
        </Container>
      </Box>
    </>
  );
}
export default SingleChore;
