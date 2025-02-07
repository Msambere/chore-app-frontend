import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Rating,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ChoreResponse from "~/types/Response/ChoreResponse";
import { deleteEntityApiCall } from "~/Helper Functions/ApiCalls";
import UserData from "~/types/Response/UserData";
import SingleChoreDetails from "./SingleChoreDetails";
import EditChoreForm from "./EditChoreForm";
import ConfirmationDeleteDialog from "~/Components/SharedComponents/ConfirmationDeleteDialog";

interface ChoreProps {
  chore: ChoreResponse;
  setUserData: Dispatch<SetStateAction<UserData>>;
  recurrenceList: string[];
  categoryList: string[];
}

export default function SingleChore({
  chore,
  setUserData,
  recurrenceList,
  categoryList,
}: ChoreProps) {
  const [isEditing, setEditing] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const handleDeleteConfirm = async () => {
    try {
      await deleteEntityApiCall("chores", chore.choreId);
      // Remove from userData
      setUserData((prevState: UserData) => ({
        ...prevState,
        chores: prevState.chores.filter((oldChore) => oldChore !== chore),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Card
        sx={{
          height: "100%",
          borderRadius: 3,
          boxShadow: 3,
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: 6,
          },
        }}
      >
        <CardContent>
          {isEditing ? (
            <EditChoreForm
              chore={chore}
              setUserData={setUserData}
              setEditing={setEditing}
              recurrenceList={recurrenceList}
              categoryList={categoryList}
            />
          ) : (
            <>
              {/* Title + Difficulty (fire icons) in one row */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, mr: 1 }} // smaller size than h5/h6
                >
                  {chore.title}
                </Typography>

                <Rating
                  size="small"
                  name="difficulty-fire"
                  value={chore.difficulty}
                  max={3}
                  readOnly
                  icon={<LocalFireDepartmentIcon fontSize="inherit" />}
                  emptyIcon={
                    <LocalFireDepartmentIcon
                      fontSize="inherit"
                      sx={{ opacity: 0.25 }}
                    />
                  }
                />
              </Box>
              <SingleChoreDetails chore={chore} />
            </>
          )}
        </CardContent>

        {/* Icon buttons: Edit & Delete (shown only if not editing) */}
        {!isEditing && (
          <CardActions sx={{ justifyContent: "flex-end", pt: 0 }}>
            <IconButton
              color="primary"
              onClick={() => setEditing(true)}
              aria-label="Edit chore"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => setOpenDeleteDialog(true)}
              aria-label="Delete chore"
            >
              <DeleteIcon />
            </IconButton>
          </CardActions>
        )}
      </Card>

      {/* Confirmation Dialog for Delete */}
      <ConfirmationDeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={() => {
          handleDeleteConfirm();
          setOpenDeleteDialog(false);
        }}
        title="Confirm Delete"
        message="Are you sure you want to delete this chore? This action cannot be undone."
      />
    </>
  );
}
