const CDN_URL =
  process.env.NEXT_PUBLIC_CDN_URL ||
  "https://macasp.s3.ap-south-1.amazonaws.com";

export const getImageUrl = (filename: string) => {

  return `${CDN_URL}/${filename}`;
};
