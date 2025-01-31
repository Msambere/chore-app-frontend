export interface userRequest{
  firstName: string;
  lastName: string;
  username: string;
  email: string;

}

export interface choreRequest{
  title: string;
  description: string;
  category: string;
  duration: number;
  difficulty: number;
  userId: number;
}

export interface rewardRequest{
  name: string;
  description: string;
  inMission: boolean;
  pointsNeeded: number;
  userId: number;
}

export interface missionRequest{
  userId: number;
  recurrence: string | null;
  category: string | null;
  timeLimit: number | null;
}
