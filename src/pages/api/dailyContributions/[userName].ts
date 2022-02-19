// 毎日の更新用

import { Octokit } from "@octokit/core";
import dayjs from "dayjs";
import type { NextApiRequest, NextApiResponse } from "next";

type Contributions = {
  user: {
    contributionsCollection: {
      contributionCalendar: {
        weeks: [
          {
            contributionDays: [
              {
                date: string;
                contributionCount: number;
              }
            ];
          }
        ];
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

  const now = dayjs().format("YYYY-MM-DDThh:mm:ss");
  const oneWeekBefore = dayjs()
    .subtract(1, "week")
    .format("YYYY-MM-DDThh:mm:ss");

  const query = `
    query contributions ($userName:String!, $now:DateTime!, $oneWeekBefore:DateTime!) {
      user(login: $userName) {
        contributionsCollection(to: $now, from: $oneWeekBefore) {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const contributions = await octokit.graphql<Contributions>(query, {
    userName,
    now,
    oneWeekBefore
  });

  // code
  console.log(contributions);

  return response.status(200).json({});
}
