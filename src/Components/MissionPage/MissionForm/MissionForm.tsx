// import MissionChoreResponse from "~/types/Response/MissionChoreResponse";
// import { Dispatch, SetStateAction, useEffect, useState } from "react";
// import { Box, Typography, MenuItem, Button } from "@mui/material";
// import {Form, useSubmit} from "react-router";
// import TextField from "@mui/material/TextField";
// import UserData from "~/types/Response/UserData";
// import { extractUserRecurrences } from "~/Helper Functions/extractUserRecurrences";
// import { extractUserCategories } from "~/Helper Functions/extractUserCategories";
// import { MissionRequest } from "~/types/Request/MissionRequest";
// import { createNewMission } from "~/Helper Functions/ApiCalls";
// import MissionResponse from "~/types/Response/MissionResponse";
//
// interface MissionProps {
//   setMissionChores: Dispatch<SetStateAction<MissionChoreResponse[]>>;
//   setStartMission: Dispatch<SetStateAction<boolean>>;
//   userData: UserData;
// }
// const MissionForm = (props: MissionProps) => {
//   const [recurrenceOptions, setRecurrenceOptions] = useState<string[]>();
//   const [categoryOptions, setCategoryOptions] = useState<string[]>();
//   const [missionRequestData, setMissionRequestData] = useState<MissionRequest>({
//     recurrence: null,
//     category: null,
//     timeLimit: null,
//   });
//   useEffect(() => {
//     setRecurrenceOptions(extractUserRecurrences(props.userData.chores));
//     setCategoryOptions(extractUserCategories(props.userData.chores));
//   }, []);
//
//   const handleInputChange = (
//     fieldName: string,
//     fieldValue: string | number,
//   ): void => {
//     console.log(fieldName, fieldValue);
//     setMissionRequestData({ ...missionRequestData, [fieldName]: fieldValue });
//   };
//
//   const handleStartMission = (event) => {
//     event.preventDefault();
//     console.log("MissionRequest being sent");
//     // make api Post request
//     createNewMission(props.userData.userId, missionRequestData).then(
//       (response: MissionResponse) => {
//         props.setMissionChores(response.missionChores);
//         props.setStartMission(true);
//         useSubmit();
//       },
//     );
//   };
//
//   return (
//     <>
//       <Box sx={{ maxWidth: 400, margin: "auto", padding: 3 }}>
//         <Typography variant="h4" gutterBottom>
//           Create Mission
//         </Typography>
//         <Form method="post" onSubmit={(event) => handleStartMission(event)}>
//           <TextField
//             fullWidth
//             select
//             name="recurrence"
//             label="Recurrence"
//             margin="normal"
//             required
//             defaultValue={missionRequestData.recurrence || ""}
//             onChange={(event) =>
//               handleInputChange(event.target.name, event.target.value)
//             }
//           >
//             {recurrenceOptions?.map((recurrence, index) => (
//               <MenuItem key={index} value={recurrence}>
//                 {recurrence}
//               </MenuItem>
//             ))}
//           </TextField>
//
//           <TextField
//             fullWidth
//             name="category"
//             label="Category"
//             margin="normal"
//             placeholder="Optional"
//             defaultValue={missionRequestData.category || ""}
//             onChange={(event) =>
//               handleInputChange(event.target.name, event.target.value)
//             }
//           >
//             {categoryOptions?.map((category, index) => (
//               <MenuItem key={index} value={category}>
//                 {category}
//               </MenuItem>
//             ))}
//           </TextField>
//
//           <TextField
//             fullWidth
//             name="timeLimit"
//             label="Time Limit (minutes)"
//             type="number"
//             margin="normal"
//             required
//             defaultValue=""
//           />
//
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{ marginTop: 2 }}
//             // onClick={(event) => handleStartMission(event)}
//           >
//             {/*{isSubmitting ? "Creating..." : "Create Mission"}*/}
//             Start Mission!
//           </Button>
//         </Form>
//
//         {/* If you want a "Back" button */}
//         <Button
//           variant="text"
//           color="secondary"
//           onClick={() => window.history.back()}
//           sx={{ marginTop: 2 }}
//         >
//           Back
//         </Button>
//       </Box>
//     </>
//   );
// };
//
// export default MissionForm;
