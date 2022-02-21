import { config } from "firebase-functions";
import fetch from "node-fetch";
import { baseUrl } from "..";
// import { DaliyContributions, TotalContributions } from "../types";

export const getContributinos = async (githubId: string) => {
  const headers = {
    Username: config().basic.username,
    Password: config().basic.password
  };

  const responses = await Promise.all([
    fetch(`${baseUrl}/api/dailyContributions/${githubId}`, { headers }),
    fetch(`${baseUrl}/api/totalContributions/${githubId}`, { headers })
  ]);

  const dailyContributions = await responses[0].json(); // as DaliyContributions;
  const totalContributinos = await responses[1].json(); // as TotalContributions;

  return {
    dailyContributions,
    totalContributinos
  };
};
