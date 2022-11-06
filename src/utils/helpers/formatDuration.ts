export const formatDuration = (duration: number) => {
  return `${Math.floor(duration / 60)}:${Math.trunc(duration % 60)}`;
};
