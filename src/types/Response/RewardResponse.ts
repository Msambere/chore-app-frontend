export default interface RewardResponse {
  message: string | null;
  rewardId: number;
  name: string;
  description: string;
  inMission: boolean;
  pointsNeeded: number;
  userId: number;
}
