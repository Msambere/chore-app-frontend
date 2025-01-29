import Box from "@mui/material/Box";
import React from "react";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
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
import ChoreResponse from "~/types/ChoreResponse";

interface ChoreProps {
  chore: ChoreResponse;
}

function SingleChoreView({ chore }: ChoreProps) {
  return (
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
              <Button>Delete</Button>
            </ButtonGroup>
          </AccordionActions>
        </Accordion>
      </Container>
    </Box>
  );
}
export default SingleChoreView;
