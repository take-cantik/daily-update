export interface CurrentUser {
  id: string;
  uid: string;
  githubId: string;
  githubAvatarUrl: string;
  dailyContributions: number[];
  totalContributions: number;
  version: number;
  twitterId?: string;
  twitterAvatarUrl?: string;
}

export interface Contributions {
  dailyContributions: number[];
  totalContributions: number;
}

export interface TotalContributions {
  value: number;
}

export interface DaliyContributions {
  values: number[];
}
