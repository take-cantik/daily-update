import { config } from "firebase-functions";
import fetch from "node-fetch";
import { DaliyContributions, TotalContributions } from "../types";

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const baseUrl = config().base.url;

export const getContributinos = async (githubId: string) => {
  const responses = await Promise.all([
    fetch(`${baseUrl}/api/dailyContributions/${githubId}`),
    fetch(`${baseUrl}/api/totalContributions/${githubId}`)
  ]);

  const dailyContributions = (await responses[0].json()) as DaliyContributions;
  const totalContributinos = (await responses[1].json()) as TotalContributions;

  return {
    dailyContributions,
    totalContributinos
  };
};
