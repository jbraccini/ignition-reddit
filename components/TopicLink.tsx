import React from "react";

import COLORS from "../theme/colors";

import Author from "./Author";
import Votes from "./Votes";
import Upvote from "./Upvote";
import List from "./List";

type Props = {
  link: any;
  refetch: Function;
};

const TopicLink: React.FC<Props> = ({ link, refetch }) => {
  const { id, description, url, postedBy, votes } = link;
  const userLoggedIn = localStorage.getItem("userId") !== null;

  return (
    <div css={styles.root}>
      <div css={styles.header}>
        <Author author={postedBy} />
      </div>

      <div css={styles.description}>
        <a href={url} target="_blank" css={{ color: COLORS.textLink }}>
          {url}
        </a>
        <p>{description}</p>
      </div>

      <List horizontal css={styles.footer}>
        {userLoggedIn && <Upvote link={link} refetch={refetch} />}

        <Votes votes={votes} />
      </List>
    </div>
  );
};

const styles = {
  root: {
    display: "grid",
    borderRadius: 4,
    padding: "2rem",

    borderBottom: `1px solid ${COLORS.darkBackground}`,
  },

  description: {
    margin: "1.2rem 0",
    color: COLORS.white,
    fontSize: "1.2rem",
  },

  footer: {
    display: "flex",
  },
  header: {
    display: "flex",
  },
};

export default TopicLink;
