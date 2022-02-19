export interface TotalContributions {
  value: number;
}

export const useContributions = () => {
  const getTotalContributions = async (userName: string) => {
    const response = await fetch(`/api/totalContributions/${userName}`);

    return (await response.json()) as TotalContributions;
  };

  return {
    getTotalContributions
  };
};
