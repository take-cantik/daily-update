import type { NextPage } from "next";
import { Fragment } from "react";
import { useAuth } from "~/hook/useAuth";
import { css } from "@emotion/react";
import { getVersion } from "~/util/version";

const image = css`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const userInfo = css`
  width: 120px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const userBox = css`
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
`;

const buttons = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const version = css`
  font-size: 2rem;
  text-align: center;
`;

const Home: NextPage = (): JSX.Element => {
  const { auth, githubLogin, twitterLink, logout } = useAuth();

  const showUser = () => {
    console.log(auth);
  };

  return (
    <Fragment>
      <h1>Hello, world!</h1>
      <div css={buttons}>
        <button onClick={githubLogin}>github</button>
        <button onClick={twitterLink}>twitter</button>
        <button onClick={logout}>logout</button>
        <button onClick={showUser}>show user</button>
      </div>
      {auth.currentUser && (
        <Fragment>
          <h1 css={version}>{getVersion(auth.currentUser.version)}</h1>
          <div css={userBox}>
            <div css={userInfo}>
              <img src={auth.currentUser.githubAvatarUrl} css={image} />
              <p>{auth.currentUser.githubId}</p>
            </div>
            {auth.currentUser.twitterId && (
              <div css={userInfo}>
                <img src={auth.currentUser.twitterAvatarUrl} css={image} />
                <p>{auth.currentUser.twitterId}</p>
              </div>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
