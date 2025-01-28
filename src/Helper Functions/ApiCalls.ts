import axios from "axios";

const VITE_APP_BACKEND_URL : string = import.meta.env.VITE_APP_BACKEND_URL

// Test Data
export const getTestString= (): Promise<string> => {
  return axios.get(`${VITE_APP_BACKEND_URL}`)
    .then((response) => {
      console.log(response.data)
      return response.data;
    });
};


// GET: data for one User
/**
 * Retrieve all data for one User
 *
 * @params: userID
 * @returns: User response object
 *  { "message": "User created successfully",
 *     "userId": string,
 *     "firstName": string,
 *     "lastName": string,
 *     "email": string,
 *     "username": string
 *     "chores": [][],
 *     "missions": [][],
 *     “Rewards”: [][]
 *     }
 */
export const getUserDataAPICall = (userId : number) =>{
  return axios.get(`${VITE_APP_BACKEND_URL}/users/${userId}`)
    .then((response) => {
      console.log(response.data)
      return response.data;
    });

}

// POST : new User
/**
 * Adds a new user to database
 *
 * @params: dictionary/json object with: firstName: string, lastName: string, username: string, email: string
 * @returns: User response object
 *  { "message": "User created successfully",
*     "userId": string,
*     "firstName": string,
*     "lastName": string,
*     "email": string,
*     "username": string
*     "chores": [][],
*     "missions": [][],
*     “Rewards”: [][]
*     }
 */

// POST : new Chore
/**
 * Adds a new chore for specific user to database
 *
 * @params: dictionary/json object with: title: string, description: string, recurrence: string, category: string, duration: number, difficulty: number, userId: number
 * @returns: Chore response object
 * {
 *     "message": "Chore created",
 *     "title": string,
 *     "description": string,
 *     "recurrence": string,
 *     "category": string,
 *     "duration": number,
 *     "difficulty": number,
 *     "userId": number,
 *     "choreId": number
 * }
 */

// POST : new Reward

// POST : new Mission



// PATCH: edit user

// PATCH: edit chore

// PATCH: edit Reward

// PATCH: edit Mission

// PATCH: edit MissionChore




// DELETE: user

// DELETE: chore

// DELETE: reward

// DELETE: mission (if user wants to cancel a mission)
