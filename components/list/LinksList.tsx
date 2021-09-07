import sortBy from "lodash/sortBy";
import { CircleSpinner } from "react-spinners-kit";

import COLORS from "../../theme/colors";

import List from "../List";
import TopicLink from "../TopicLink";

type Props = {
  links: [];
  loading: boolean;
  refetch: Function;
};

const LinksList: React.FC<Props> = ({ links, loading, refetch }) => {
  const sorted = sortBy(links, (link) => link.votes?.length).reverse();
  return (
    <List css={styles.root} gridGap={0} loading={loading}>
      {sorted.map((link) => (
        <TopicLink key={link.id} link={link} refetch={refetch} />
      ))}
    </List>
  );
};

const styles = {
  root: {
    display: "grid",
    // padding: "1rem",
    backgroundColor: COLORS.lightBackground,

    borderRadius: 8,
  },
};

export default LinksList;
