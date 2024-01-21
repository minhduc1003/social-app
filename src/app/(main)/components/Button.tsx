import React, { ReactNode } from "react";
import style from "../styles/button.module.scss";
type Props = {
  onClick?: (e: any) => Promise<void>;
  disabled?: boolean;
  children: ReactNode;
};
const Button = ({ onClick, disabled, children }: Props) => {
  return (
    <button onClick={onClick} disabled={disabled} className={style.btn}>
      {children}
    </button>
  );
};

export default Button;
