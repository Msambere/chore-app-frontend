export default interface RewardResponse {
  rewardId: number;
  name: string;
  description: string;
  inMission: boolean;
  pointsNeeded: number;
  message: string | null;
  userId: number;
}
