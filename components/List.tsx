import React from "react";
import clsx from "clsx";
import { CircleSpinner } from "react-spinners-kit";

type Props = {
  horizontal: boolean;
  className: string;
  gridGap?: string;
  loading?: boolean;
};

const List: React.FC<Props> = ({ children, horizontal, className, loading = false, gridGap = "1rem", ...rest }) => {
  const classes = clsx({
    [className]: className,
    "is-horizontal": horizontal,
  });

  const dynamicStyles = {
    gridGap,
    ...rest,
  };

  return (
    <>
      <div css={[styles.root, dynamicStyles]} className={classes}>
        {loading && (
          <div css={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
            <CircleSpinner size={25} />
          </div>
        )}
        {!loading && children}
      </div>
    </>
  );
};

const styles = {
  root: {
    display: "grid",

    "&.is-horizontal": {
      gridAutoFlow: "column",
    },
  },
};

export default List;
