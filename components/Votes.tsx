import React from "react";

import COLORS from "../theme/colors";

import Avatar from "./Avatar";
import List from "./List";
import SummonModal from "./SummonModal";

type VoteListProps = {
  avatarList: [];
  remainingVotes: [];
  showRemainingVotes: boolean;
};

const VoteList: React.FC<VoteListProps> = ({ avatarList, remainingVotes, showRemainingVotes = false }) => {
  return (
    <List gridGap="0.5rem" horizontal css={styles.root}>
      {avatarList.map(({ user }) => (
        <Avatar key={user.id} name={user.name} size={30} />
      ))}
      {showRemainingVotes && <div>+{remainingVotes} Votes </div>}
    </List>
  );
};

type Props = {
  votes: [];
};

const Votes: React.FC<Props> = ({ votes }) => {
  const reversedVotes = [...votes].reverse();
  const avatarList = reversedVotes.length > 3 ? reversedVotes.splice(0, 3) : reversedVotes;
  const remainingVotes = votes.length - avatarList.length;

  return (
    <SummonModal cta={<VoteList avatarList={avatarList} remainingVotes={remainingVotes} showRemainingVotes={votes.length > 3} />}>
      <List css={styles.votesCard}>
        {votes.map(({ user }) => (
          <List css={styles.voteItem} horizontal gridTemplateColumns="20px auto">
            <Avatar name={user.name} tooltip={false} key={user.id} />
            <div>{user.name}</div>
          </List>
        ))}
      </List>
    </SummonModal>
  );
};

const styles = {
  root: {
    display: "flex",
    color: COLORS.textLight,

    alignItems: "center",
    cursor: "pointer",
  },

  votesCard: {
    padding: "1rem",
    backgroundColor: COLORS.white,
    width: 200,
    borderRadius: 10,

    maxHeight: 250,
    overflowY: "scroll",
  },

  voteItem: {},
};

export default Votes;
