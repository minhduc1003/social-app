// import "./globals.css";
// import type { Metadata } from 'next'
import Image from "next/image";
import Link from "next/link";
import style from "./scss/layout.module.scss";
export default function Layout({
  children,
  page,
}: {
  children: React.ReactNode;
  page: "login" | "signup" | "forgotPassword";
}) {
  let message1, message2, message3, message4;
  switch (page) {
    case "login":
      message1 = "Log In";
      message2 = "If you don't an account";
      message3 = "you can";
      message4 = " Register here!";
      break;
    case "signup":
      message1 = "Sign Up";
      message2 = "If you have an account";
      message3 = "you can";
      message4 = " Log In here!";
      break;
    case "forgotPassword":
      message1 = "Recover Account";
      message2 = "If you remember the account";
      message3 = "you can";
      message4 = " Log In here!";
      break;
    default:
      break;
  }
  return (
    <main className={style.container}>
      <div className={style.left}>
        <div className={style.wrapper}>
          <div className={style.textWrap}>
            <h1>{message1}</h1>
            <p>
              {message2} <br /> {message3}
              <span>
                <Link href={`/${page == "login" ? "signup" : "login"}`}>
                  {message4}
                </Link>
              </span>
            </p>
          </div>
          <div className={style.wrapImage}>
            <img src="/rocket.png" alt="" />
          </div>
        </div>
        {children}
      </div>
      <img className={style.bgImage} src="/bg.png" alt="" />
    </main>
  );
}
