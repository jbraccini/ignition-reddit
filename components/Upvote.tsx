import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { gql, useMutation } from "@apollo/client";

import { LINK_UPVOTE } from "../graph/mutations";

type Props = {
  link: any;
  refetch: Function;
};

const userHasVoted = (id, votes) => {
  let result = false;

  for (var i = 0; i < votes.length; i++) {
    if (Number(votes[i].user.id) === Number(id)) {
      result = true;
      break;
    }
  }

  return result;
};

const Upvote: React.FC<Props> = ({ link, refetch }) => {
  const [disabled, setDisabled] = useState(false);
  const [linkUpvoteMutation, { data, loading, error }] = useMutation(LINK_UPVOTE);
  const { id } = link;

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      setDisabled(userHasVoted(userId, link.votes));
    }
  }, [link]);

  useEffect(() => {
    if (!data || !refetch) return null;

    refetch();
  }, [data]);

  return (
    <button
      type="button"
      onClick={() => {
        setDisabled(true);
        linkUpvoteMutation({
          variables: { id },
        });
      }}
      disabled={disabled}
    >
      {loading && <span>Voting...</span>}
      {!loading && <span>Upvote</span>}
    </button>
  );
};

export default Upvote;
