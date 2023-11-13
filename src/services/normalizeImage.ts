const IMG_SIZES = {
  xs: "90x90",
  s: "240x150",
  m: "312x231",
  l: "480x360",
  xl: "556x370",
  xxl: "636x393",
};

export const normalizeImage = (url: string) => {
  let sliceIndex = url.indexOf("-") + 1;
  const firstHalf = url.slice(0, sliceIndex);
  let secondHalf = url.slice(sliceIndex);
  sliceIndex = secondHalf.indexOf(".");
  secondHalf = secondHalf.slice(sliceIndex);

  return firstHalf + IMG_SIZES.xl + secondHalf;
};
