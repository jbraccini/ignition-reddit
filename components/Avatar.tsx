import React from "react";
import { desaturate, lighten, readableColor } from "polished";

import { initials, stringToColor } from "../utils/functions";
import COLORS from "../theme/colors";

import Tooltip from "./Tooltip";
import List from "./List";

type Props = {
  name: string;
  size: number;
  tooltip: boolean;
};

const Avatar: React.FC<Props> = ({ name, size = 20, tooltip = true }) => {
  const backgroundColor = lighten(0.2, desaturate(0.4, stringToColor(name)));
  const dynamicStyles = {
    backgroundColor,
    color: lighten(0.2, readableColor(backgroundColor, COLORS.white, COLORS.black)),
    fontSize: size / 2,
    width: size,
    height: size,
  };

  return (
    <Tooltip
      disabled={!tooltip}
      tooltipChildren={
        <List horizontal gridGap="0.5rem">
          <div css={[styles.root, dynamicStyles]}>{initials(name)}</div>
          <div css={{ display: "flex", alignItems: "center" }}>{name}</div>
        </List>
      }
    >
      <div css={[styles.root, dynamicStyles]}>{initials(name)}</div>
    </Tooltip>
  );
};

const styles = {
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
    color: "white",
    borderRadius: "100%",
    fontSize: "0.8rem",
    fontWeight: "bold",
  },
};

export default Avatar;
