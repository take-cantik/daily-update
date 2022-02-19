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
  const twoDaysBefore = dayjs()
    .subtract(2, "day")
    .format("YYYY-MM-DDThh:mm:ss");

  const query = `
    query contributions ($userName:String!, $now:DateTime!, $twoDaysBefore:DateTime!) {
      user(login: $userName) {
        contributionsCollection(to: $now, from: $twoDaysBefore) {
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
    twoDaysBefore
  });

  const dailyContributions: number[] = [];
  contributions.user.contributionsCollection.contributionCalendar.weeks.forEach(
    (week) => {
      week.contributionDays.forEach((contributionDay) => {
        dailyContributions.push(contributionDay.contributionCount);
      });
    }
  );

  return response.status(200).json({
    values: dailyContributions
  });
}
