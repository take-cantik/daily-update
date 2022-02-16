import type { NextPage } from "next";
import { Fragment } from "react";
import { useAuth } from "~/hook/useAuth";

const Home: NextPage = (): JSX.Element => {
  const { githubLogin, twitterLink, logout } = useAuth();

  return (
    <Fragment>
      <h1>Hello, world!</h1>
      <button onClick={githubLogin}>github</button>
      <button onClick={twitterLink}>twitter</button>
      <button onClick={logout}>logout</button>
    </Fragment>
  );
};

export default Home;
