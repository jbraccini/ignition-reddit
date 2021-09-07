import clsx from "clsx";
import { CircleSpinner } from "react-spinners-kit";
import COLORS from "../theme/colors";

type Props = {
  label: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
};

const Button: React.FC<Props> = ({ label, loading = false, disabled = false, className, ...rest }) => {
  const classNames = clsx({
    "is-disabled": disabled,
    [className]: className,
  });

  return (
    <button css={styles.root} className={classNames} {...rest}>
      {loading && (
        <div css={{ marginRight: "1rem" }}>
          <CircleSpinner size={20} />
        </div>
      )}
      {!loading && label}
    </button>
  );
};

const styles = {
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    border: "none",
    padding: "0.5rem",
    height: 45,

    cursor: "pointer",
    borderRadius: 6,
    fontSize: "1rem",

    color: COLORS.textLight,
    backgroundColor: COLORS.defaultSelection,

    "&:hover": {
      backgroundColor: COLORS.primarySelection,
    },

    "&.is-disabled": {
      opacity: 0.5,
      pointerEvents: "none",
    },
  },
};

export default Button;
