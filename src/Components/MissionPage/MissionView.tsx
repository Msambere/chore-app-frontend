import React, { ReactElement, useState, useEffect } from "react";
import axios from "axios";
import ActiveMission from "~/Components/MissionPage/ActiveMission/ActiveMission";
import MissionChoreResponse from "~/types/Response/MissionChoreResponse";
import RewardResponse from "~/types/Response/RewardResponse";

// Get backend URL from VITE environment variables
const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;

const MissionView = (): ReactElement => {
  const [missionChores, setMissionChores] = useState<MissionChoreResponse[]>(
    [],
  );
  const [rewards, setRewards] = useState<RewardResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    // Fetch Mission Chores
    axios
      .get<MissionChoreResponse[]>(`${BASE_URL}/missionchores`)
      .then((response) => {
        setMissionChores(response.data);
      })
      .catch((err) => {
        console.error("Error fetching mission chores:", err);
        setError("Failed to load mission chores.");
      });

    // Fetch Rewards
    axios
      .get<RewardResponse[]>(`${BASE_URL}/users/1/rewards`)
      .then((response) => {
        setRewards(response.data);
      })
      .catch((err) => {
        console.error("Error fetching rewards:", err);
        setError("Failed to load rewards.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return <ActiveMission missionChores={missionChores} rewards={rewards} />;
};
export default MissionView;
