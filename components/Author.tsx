import React from "react";
import { lighten, desaturate } from "polished";

import { stringToColor } from "../utils/functions";
import COLORS from "../theme/colors";

type Props = {
  author: any;
};

const Author: React.FC<Props> = ({ author }) => {
  const { id, name } = author;

  const dynamicStyles = {
    backgroundColor: lighten(0.1, desaturate(0.5, stringToColor(name))),
  };

  return <div css={[styles.root, dynamicStyles]}>Posted by {name}</div>;
};

const styles = {
  root: {
    padding: "0.25rem",
    borderRadius: 5,
    textTransform: "uppercase",
    color: COLORS.white,
    fontSize: "0.75rem",
  },
};

export default Author;
