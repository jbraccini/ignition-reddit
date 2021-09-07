import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

import { FETCH_FEED } from "../graph/queries";
import COLORS from "../theme/colors";

import LinksList from "../components/list/LinksList";
import PageContent from "../components/PageContent";
import Navigation from "../components/Navigation";

const MainBoardPage = () => {
  const { data, loading, error, refetch } = useQuery(FETCH_FEED);
  const [links, setLinks] = useState([]);

  if (error) {
    console.error(error);
    return null;
  }

  useEffect(() => setLinks(data?.feed.links), [data]);

  return (
    <div css={styles.root}>
      <PageContent>
        <Navigation />
        <LinksList links={links} loading={loading} refetch={refetch} />
      </PageContent>
    </div>
  );
};

const styles = {
  root: {
    backgroundColor: COLORS.darkBackground,

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  container: {
    maxWidth: 960,
    minWidth: 900,
  },
};

export default MainBoardPage;
