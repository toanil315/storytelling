export const getDurationFromALink = (
  videoRef: any,
  link: string
): Promise<number> => {
  return new Promise((resolve) => {
    if (videoRef.current) {
      videoRef.current.src = link;
      videoRef.current.preload = "metadata";
      videoRef.current.onloadeddata = () => {
        resolve(videoRef.current?.duration);
      };
    } else {
      resolve(0);
    }
  });
};
