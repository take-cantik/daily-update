import fetch, { Request, RequestInit, Response } from "node-fetch";

interface Global {
  fetch(
    url: string | Request,
    init?: RequestInit | undefined
  ): Promise<Response>;
}
declare let global: Global;
global.fetch = fetch;
import { baseUrl } from "..";
import { DaliyContributions, TotalContributions } from "../types";

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
