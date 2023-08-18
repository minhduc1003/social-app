"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../components/Input";
import Link from "next/link";
import Button from "../components/Button";
import style from "../scss/globalAuth.module.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { forgotPasswordEmail } from "../types/typeAuth";
const ForgotPasword = () => {
  const { control, handleSubmit } = useForm<forgotPasswordEmail>({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });
  const submitForm: SubmitHandler<forgotPasswordEmail> = async (data) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}api/user/forgotpassword`,
        data
      );
      toast.success("sent email successfully please check your email");
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
      <Button type={"submit"}>Sign In</Button>
    </form>
  );
};

export default ForgotPasword;
