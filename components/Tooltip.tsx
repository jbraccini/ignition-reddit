import { useState } from "react";
import { usePopper } from "react-popper";

type Props = {
  tooltipChildren: React.ReactNode;
  text: string;
  placement: string;
  disabled?: boolean;
};

const Tooltip: React.FC<Props> = ({ children, tooltipChildren, text, placement = "top", disabled }) => {
  const [open, setOpen] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      },
    ],
  });

  return (
    <>
      <div ref={setReferenceElement} onMouseOver={() => (!disabled ? setOpen(true) : null)} onMouseOut={() => setOpen(false)}>
        {children}
      </div>
      {open && (
        <div ref={setPopperElement} style={styles.popper} {...attributes.popper} css={tooltipStyles.root}>
          {tooltipChildren && tooltipChildren}
          {!tooltipChildren && text}
        </div>
      )}
    </>
  );
};

const tooltipStyles = {
  root: {
    backgroundColor: "white",
    borderRadius: 6,
    padding: "0.5rem",
    textTransform: "uppercase",
    fontSize: "0.9rem",
    // margin: "0.5rem",
  },
};

export default Tooltip;
