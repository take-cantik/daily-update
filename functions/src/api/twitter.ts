import fetch from "node-fetch";

export const tweet = async (token: string) => {
  const data = {
    text: "ahi"
  };

  const res = await fetch("https://api.twitter.com/2/tweets", {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return res;
};
