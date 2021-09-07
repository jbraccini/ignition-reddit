import { default as RouterLink } from "next/link";

import COLORS from "../theme/colors";

const Link: React.FC = ({ children, href, ...rest }) => {
  return (
    <RouterLink href={href} {...rest}>
      <span css={styles.root}>{children}</span>
    </RouterLink>
  );
};

const styles = {
  root: {
    color: COLORS.textLink,
    cursor: "pointer",

    "&:hover": {
      textDecoration: "underline",
    },
  },
};

export default Link;
