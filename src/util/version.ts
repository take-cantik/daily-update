const zeroPadding = (number: number): string => {
  return ("00" + number).slice(-2);
};

export const getVersion = (version: number) => {
  const xx = String(Math.floor(version / 10000));
  const yy = zeroPadding(Math.floor((version % 10000) / 100));
  const zz = zeroPadding(Math.floor(version % 100));

  return `v ${xx}.${yy}.${zz}`;
};

// export const updateVersion = (
//   version: number,
//   dailyContributions: number,
//   totalContributions
// ) => {
//   return;
// };
