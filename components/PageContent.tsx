type Props = {
  className?: string;
};

const PageContent: React.FC<Props> = ({ children, className }) => {
  return (
    <div css={styles.root} className={className}>
      {children}
    </div>
  );
};

const styles = {
  root: {
    width: "80%",
    maxWidth: 960,

    display: "grid",
    gridGap: "1rem",
  },
};

export default PageContent;
