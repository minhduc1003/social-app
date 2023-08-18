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
const FormLogIn = () => {
  const { control, handleSubmit } = useForm<Login>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const submitForm: SubmitHandler<Login> = async (data) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}api/user/login`,
        data
      );
      toast.success("login successful");
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
