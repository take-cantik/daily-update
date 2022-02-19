export interface TotalContributions {
  value: number;
}

export interface DaliyContributions {
  value: number[];
}

export const useContributions = () => {
  const getTotalContributions = async (userName: string) => {
    const response = await fetch(`/api/totalContributions/${userName}`);

    return (await response.json()) as TotalContributions;
  };

  const getDaliyContributions = async (userName: string) => {
    const response = await fetch(`/api/dailyContributions/${userName}`);

    return (await response.json()) as DaliyContributions;
  };

  return {
    getTotalContributions,
    getDaliyContributions
  };
};
