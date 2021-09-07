import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type Props = {
  defaultValues?: object;
  onSubmit: Function;
  resolver: any;
  className?: string;
};

const Form: React.FC<Props> = ({ children, defaultValues = {}, resolver, onSubmit = () => null, className }) => {
  const { register, handleSubmit, formState } = useForm({ defaultValues, resolver: yupResolver(resolver) });
  const { errors } = formState;

  const childrenWithProps = React.Children.map(children, (child: any) =>
    React.cloneElement(child, { register, error: child.props.model ? errors[child.props.model] : null })
  );

  return (
    <form css={styles} className={className} onSubmit={handleSubmit(onSubmit)}>
      {childrenWithProps}
    </form>
  );
};

const styles = {
  display: "grid",
  gap: "1rem",
};

export default Form;
