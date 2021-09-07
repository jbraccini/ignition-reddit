import { useEffect, useState } from "react";

import COLORS from "../theme/colors";

import List from "./List";
import Link from "./Link";

const Navigation = () => {
  const [userLoggedIn, setUserLoggedIn] = useState();

  useEffect(() => {
    setUserLoggedIn(localStorage.getItem("userId") !== null);
  }, []);

  return (
    <div css={styles.root}>
      <div css={styles.logo}>Logo</div>
      <List horizontal>
        {!userLoggedIn && (
          <List horizontal>
            <Link href="/signin">Sign In</Link>
            <span>or</span>
            <Link href="/signup">Sign Up</Link>
          </List>
        )}
        {userLoggedIn && (
          <List horizontal>
            <Link href="/post">New Post</Link>
            <span>-</span>
            <Link href="/logout">Logout</Link>
          </List>
        )}
      </List>
    </div>
  );
};

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    height: 100,
    color: COLORS.textLight,
  },

  navigation: {
    display: "grid",
    gridGap: "1rem",
    gridAutoFlow: "column",
  },
};

export default Navigation;
