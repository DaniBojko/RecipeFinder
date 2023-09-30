export const normalizeImage = (url: string, imgType: string) => {
  return url.slice(0, url.indexOf("-") + 1) + "636x393." + imgType;
};
