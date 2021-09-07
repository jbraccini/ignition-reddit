import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { usePopper } from "react-popper";
import { useDetectClickOutside } from "react-detect-click-outside";

type Props = {
  placement: string;
  className?: string;
  cta: React.ReactNode;
};

const SummonModal: React.FC<Props> = ({ children, cta, placement = "bottom", className }) => {
  const [open, setOpen] = useState(false);
  const ref = useDetectClickOutside({ onTriggered: () => setOpen(false) });
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
    <div ref={ref}>
      <div ref={setReferenceElement} className={className} onClick={() => setOpen(!open)}>
        {cta}
      </div>
      {open &&
        ReactDOM.createPortal(
          <div ref={setPopperElement} style={styles.popper} {...attributes.popper} ck>
            {children}
          </div>,
          document.querySelector("#portal-modals")
        )}
    </div>
  );
};

export default SummonModal;
