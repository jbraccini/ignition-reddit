import React from "react";
import { lighten } from "polished";

import COLORS from "../../theme/colors";

type Props = {
  label?: string;
  error?: any;
  placeholder?: string;
  model: string;
  register?: Function;
};

const InputText: React.FC<Props> = ({ model, error, register = () => null, label, placeholder, ...rest }) => {
  return (
    <div css={styles.root}>
      {label && (
        <label for-={model} css={styles.label}>
          {label}
        </label>
      )}
      <input name={model} type="text" {...register(model)} {...rest} css={styles.input} />
      {error && <div css={styles.error}>{error.message}</div>}
    </div>
  );
};

const styles = {
  root: {
    display: "grid",
    gap: "0.5rem",
  },

  error: {
    border: `1px solid red`,
    backgroundColor: "red",
    color: "white",
    padding: "0.5rem",
    textAlign: "center",
    borderRadius: 4,
    textTransform: "uppercase",
    fontSize: ".75rem",
    fontWeight: "bold",
  },

  label: {
    color: COLORS.textLight,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "-0.6px",
  },

  input: {
    height: 40,
    fontSize: 15,
    color: COLORS.white,
    border: "none",
    borderRadius: 4,
    padding: "0.5rem 1rem",
    backgroundColor: lighten(0.05, COLORS.lightBackground),

    "&:focus": {
      outline: 0,
      backgroundColor: lighten(0.1, COLORS.lightBackground),
    },
  },

  placeholder: {
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    lineHeight: "100%",
  },
};

export default InputText;
