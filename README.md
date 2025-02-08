# ChoreChamp: A Gamified Chore Management App

ChoreChamp is a React-based web application that gamifies household chores, making task management fun and rewarding.

The app allows users to create and manage chores, embark on missions, earn points, and redeem rewards. With its intuitive interface and engaging features, ChoreChamp transforms mundane household tasks into exciting challenges.

## Repository Structure

```
chore-app-frontend/
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── Components/
    │   ├── ChoresPage/
    │   ├── Layout/
    │   ├── LoginPage/
    │   ├── MissionPage/
    │   ├── RewardsPage/
    │   ├── SharedComponents/
    │   ├── SideBar/
    │   └── UserProfilePage/
    ├── Helper Functions/
    ├── Theme/
    └── types/
```

Key Files:
- `App.tsx`: Main application component
- `main.tsx`: Entry point of the application
- `Components/Layout/Layout.tsx`: Main layout component
- `Components/MissionPage/ActiveMission/ActiveMission.tsx`: Handles active mission functionality
- `Components/LoginPage/LoginView.tsx`: Manages user login

Important integration points:
- `Helper Functions/ApiCalls.ts`: Contains API calls to the backend
- `Theme/theme.ts`: Defines the application's theme
- `types/`: Contains TypeScript type definitions for the application

## Usage Instructions

### Installation

Prerequisites:
- Node.js (v14 or later)
- npm (v6 or later)

Steps:
1. Clone the repository
2. Navigate to the project directory
3. Run `npm install` to install dependencies

### Getting Started

1. Start the development server:
   ```
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:3000`

### Configuration

The application uses environment variables for configuration. Create a `.env` file in the root directory with the following variables:

```
REACT_APP_API_URL=<your_api_url>
```

### Common Use Cases

1. User Registration:
   - Navigate to the signup page
   - Fill in the required information
   - Submit the form to create a new account

2. Creating a Chore:
   - Log in to your account
   - Navigate to the Chores page
   - Click on "Create Chore"
   - Fill in the chore details and submit

3. Starting a Mission:
   - Navigate to the Mission page
   - Select mission parameters (recurrence, category, time limit)
   - Click "Start Mission" to begin

4. Redeeming Rewards:
   - Complete chores to earn points
   - Navigate to the Rewards page
   - Select a reward to redeem with your earned points

### Testing & Quality

To run tests:
```
npm test
```

### Troubleshooting

1. Login Issues:
   - Problem: Unable to log in
   - Solution: 
     1. Check if the username exists
     2. Verify the password
     3. Ensure the backend API is running and accessible

2. Mission Not Starting:
   - Problem: Unable to start a new mission
   - Solution:
     1. Check if there are available chores matching the selected criteria
     2. Verify that the user is not already on an active mission
     3. Check the console for any error messages

3. Points Not Updating:
   - Problem: Points are not updating after completing a chore
   - Solution:
     1. Verify that the chore was marked as completed
     2. Check the network tab in browser dev tools for successful API calls
     3. Refresh the page to see if points update

For any persistent issues, check the browser console for error messages and verify the API responses in the Network tab of your browser's developer tools.

## Data Flow

The ChoreChamp application follows a client-server architecture with the React frontend communicating with a backend API. Here's an overview of the data flow:

1. User Authentication:
   - User submits login credentials
   - Frontend sends a request to the backend API
   - Backend validates credentials and returns user data
   - Frontend stores user data in state and local storage

2. Chore Management:
   - User creates/edits/deletes a chore
   - Frontend sends API request with chore data
   - Backend processes the request and updates the database
   - Frontend updates local state with the response

3. Mission Flow:
   - User starts a mission
   - Frontend requests mission creation from the backend
   - Backend generates mission chores and returns data
   - Frontend displays active mission and tracks progress
   - As user completes chores, frontend sends updates to backend
   - Backend calculates points and updates mission status

4. Reward Redemption:
   - User selects a reward to redeem
   - Frontend sends redemption request to backend
   - Backend verifies points and processes redemption
   - Frontend updates user's point balance and reward status

```
+-------------+        +-------------+        +-------------+
|             |        |             |        |             |
|   Frontend  | <----> |  Backend API| <----> |  Database   |
|   (React)   |        |             |        |             |
|             |        |             |        |             |
+-------------+        +-------------+        +-------------+
      ^                      ^
      |                      |
      v                      v
+-------------+        +-------------+
|             |        |             |
| Local State |        | Local Storage|
|             |        |             |
+-------------+        +-------------+
```

Note: Ensure proper error handling and state management throughout the application to maintain data consistency between the frontend and backend.