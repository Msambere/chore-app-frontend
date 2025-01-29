

export interface userResponse{
  message: string;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  chores: choreResponse[];
  missions: missionResponse[];
  rewards: rewardResponse[];
}

export interface choreResponse{
  message: string;
  title: string;
  description: string;
  recurrence: string;
  category: string;
  duration: number;
  difficulty: number;
  userId: number;
  choreId: number;

}

export interface missionResponse{
  message: string;
  missionId: number;
  category: string | null;
  recurrence: string | null;
  totalUnredeemedPoints: number;
  dateStarted: Date;
  timeLimit: number | null;
  timeElapsed: number | null;
  userId: number;
  missionChores: missionChoreResponse[];
}

export interface missionChoreResponse{
  message: string | null;
  missionId: number;
  choreId: number;
  choreName: string;
  duration: number;
  points: number;
  completed: boolean;
}

export interface rewardResponse{
  rewardId: number;
  name: string;
  description: string;
  inMission: boolean;
  pointsNeeded: number;
  userId: number;
}
