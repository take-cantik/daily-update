import { config } from "firebase-functions";
import { Buffer } from "buffer";
import fetch from "node-fetch";
import { baseUrl } from "..";
// import { DaliyContributions, TotalContributions } from "../types";

export const getContributinos = async (githubId: string) => {
  const userName = Buffer.from(config().basic.username).toString("base64");
  const password = Buffer.from(config().basic.password).toString("base64");

  const headers = {
    Authorization: `Basic ${userName}:${password}`
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
