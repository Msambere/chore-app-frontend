export const formatTime = (
  seconds: number,
  readable: boolean = false,
): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (readable) {
    const hourStr = hours > 0 ? `${hours}h ` : "";
    const minStr = minutes > 0 ? `${minutes}m ` : "";
    const secStr = secs > 0 ? `${secs}s` : "";

    return `${hourStr}${minStr}${secStr}`.trim();
  }

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};
