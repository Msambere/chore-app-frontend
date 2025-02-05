import UserData from "~/types/Response/UserData";

/**
 * Computes user stats for the profile.
 */
export function computePointStats(user: UserData) {
  let currentPointBalance = 0;
  let totalPointsEarned = 0;
  const missionCount = user.missions.length;

  user.missions.forEach((mission) => {
    currentPointBalance += mission.totalUnredeemedPoints;
    mission.missionChores.forEach((chore) => {
      if (chore.completed) {
        totalPointsEarned += chore.points;
      }
    });
  });

  const averagePointsPerMission =
    missionCount > 0 ? totalPointsEarned / missionCount : 0;

  return { currentPointBalance, averagePointsPerMission, totalPointsEarned };
}
