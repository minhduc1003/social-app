"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../components/Input";
import Link from "next/link";
import Button from "../components/Button";
import style from "../scss/globalAuth.module.scss";
import { Login } from "../types/typeAuth";
import axios from "axios";
import { toast } from "react-toastify";
import { saveCookie } from "@/utils/cookies";
import { useDispatch } from "react-redux";
import { appSelecter, dispatchType } from "@/redux/configureStore";
import { updateUser } from "@/redux/feature/authSlice";
import { useRouter } from "next/navigation";
const FormLogIn = () => {
  const dispatch = useDispatch<dispatchType>();
  const router = useRouter();
  const { control, handleSubmit } = useForm<Login>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const submitForm: SubmitHandler<Login> = async (data) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}api/user/login`,
        data
      );
      dispatch(updateUser(res.data));
      saveCookie(res.data.token);
      toast.success("login successful");
      router.push("/");
    } catch (error) {
      toast.error("error");
    }
  };
  return (
    <form onSubmit={handleSubmit(submitForm)} className={style.formSubmit}>
      <Input
        name="email"
        placeholder="Enter Email"
        type="text"
        control={control}
      ></Input>
      <Input
        name="password"
        placeholder="Enter password"
        type="text"
        control={control}
      ></Input>
      <span className={style.resetPassword}>
        <Link href={"/forgotPassword"}>Recover Password ?</Link>
      </span>
      <Button type={"submit"}>Sign In</Button>
    </form>
  );
};

export default FormLogIn;
