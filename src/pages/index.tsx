import type { NextPage } from "next";
import { Fragment } from "react";
import { useAuth } from "~/hook/useAuth";

const Home: NextPage = (): JSX.Element => {
  const { auth, githubLogin, twitterLink, logout } = useAuth();

  const showUser = () => {
    console.log(auth);
  };

  return (
    <Fragment>
      <h1>Hello, world!</h1>
      <button onClick={githubLogin}>github</button>
      <button onClick={twitterLink}>twitter</button>
      <button onClick={logout}>logout</button>
      <button onClick={showUser}>show user</button>
      {auth.currentUser && <p>{auth.currentUser.id}</p>}
    </Fragment>
  );
};

export default Home;
