import { Octokit } from "@octokit/core";
import { NextApiRequest, NextApiResponse } from "next";

type Contributions = {
  user: {
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: number;
      };
    };
  };
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { userName } = request.query;

  const octokit = new Octokit({
    auth: process.env.NEXT_PUBLIC_GITHUB_API_KEY
  });

  const query = `
    query contributions ($userName:String!) {
      user(login: $userName) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
  `;

  const octokitRes = await octokit.graphql<Contributions>(query, {
    userName
  });

  const totalContributions: number =
    octokitRes.user.contributionsCollection.contributionCalendar
      .totalContributions;

  return response.status(200).json({
    value: totalContributions
  });
}
