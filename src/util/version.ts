const zeroPadding = (number: number): string => {
  return ("00" + number).slice(-2);
};

const getXX = (version: number) => {
  return Math.floor(version / 10000);
};

const getYY = (version: number) => {
  return Math.floor((version % 10000) / 100);
};

const getZZ = (version: number) => {
  return Math.floor(version % 100);
};

export const getVersion = (version: number) => {
  const xx = String(getXX(version));
  const yy = zeroPadding(getYY(version));
  const zz = zeroPadding(getZZ(version));

  return `v ${xx}.${yy}.${zz}`;
};

export const updateVersion = (
  version: number,
  beforeDailyContributions: number[],
  beforeTotalContributions: number,
  afterDailyContributions: number[],
  afterTotalContributions: number
) => {
  let newVersion = version;

  if (
    Math.floor(afterTotalContributions / 1000) -
      Math.floor(beforeTotalContributions / 1000) >
    1
  ) {
    newVersion = (Math.floor((newVersion /= 10000)) + 1) * 10000;
  }

  const beforeDailySum =
    beforeDailyContributions[1] + beforeDailyContributions[2];
  const afterDailySum =
    afterDailyContributions[0] +
    afterDailyContributions[1] +
    afterDailyContributions[2];

  const diffDaily = afterDailySum - beforeDailySum;

  if (diffDaily === 0) {
    return newVersion;
  } else if (diffDaily < 16) {
    return newVersion + 1;
  } else if (diffDaily < 51) {
    return newVersion + 100 - getZZ(version);
  } else {
    return newVersion + 10000 - getYY(version) - getZZ(version);
  }
};
