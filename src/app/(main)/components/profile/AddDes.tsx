import React, { ReactNode, useState } from "react";
import style from "../../styles/profile/profile.module.scss";
type Props = { des: string; children: ReactNode; onClick: () => void };
const AddDes = ({ des, onClick, children }: Props) => {
  const [open, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className={style.addNew}
        onClick={() => {
          onClick();
          setIsOpen(!open);
        }}
      >
        <span className={style.icon}>
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
          )}
        </span>
        <p className={`${style.textAddNew} ${open && style.remove}`}>{`${
          open ? "remove" : "add"
        } ${des}`}</p>
      </div>
      {open && <div className={style.changeInfo}>{children}</div>}
    </>
  );
};

export default AddDes;
