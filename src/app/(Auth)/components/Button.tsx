import React, { ReactNode } from "react";
import style from "../scss/globalAuth.module.scss";
type Props = {
  children: ReactNode;
  type: "button" | "submit" | "reset" | undefined;
} & React.HTMLAttributes<HTMLButtonElement>;
const Button = ({ children, type, ...props }: Props) => {
  return (
    <button type={type} className={style.button} {...props}>
      {children}
    </button>
  );
};

export default Button;
