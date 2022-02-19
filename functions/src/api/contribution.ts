import { DaliyContributions, TotalContributions } from "../types";

export const getContributinos = async (githubId: string) => {
  const responses = await Promise.all([
    fetch(`/api/dailyContributions/${githubId}`),
    fetch(`/api/totalContributions/${githubId}`)
  ]);

  const dailyContributions = (await responses[0].json()) as DaliyContributions;
  const totalContributinos = (await responses[1].json()) as TotalContributions;

  return {
    dailyContributions,
    totalContributinos
  };
};
