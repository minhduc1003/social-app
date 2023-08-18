"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import style from "../../../scss/globalAuth.module.scss";
import axios from "axios";
import { toast } from "react-toastify";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { forgotPasswordPassword } from "../../../types/typeAuth";
const FormChangePassword = ({ id }: { id: string }) => {
  const { control, handleSubmit } = useForm<forgotPasswordPassword>({
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
      oldPassword: "",
    },
  });
  const submitForm: SubmitHandler<forgotPasswordPassword> = async (data) => {
    try {
      if (data.password === data.confirmPassword) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}api/user/forgotpassword/${id}`,
          {
            oldPassword: data.oldPassword,
            password: data.password,
          }
        );
        toast.success("change password successfully");
      } else {
        toast.error("please write correct confirmation password");
      }
    } catch (error) {
      toast.error("error");
    }
  };
  return (
    <form onSubmit={handleSubmit(submitForm)} className={style.formSubmit}>
      <Input
        name="oldPassword"
        placeholder="Enter old password"
        type="password"
        control={control}
      ></Input>
      <Input
        name="password"
        placeholder="Enter new password"
        type="password"
        control={control}
      ></Input>
      <Input
        name="confirmPassword"
        placeholder="Enter confirm password"
        type="password"
        control={control}
      ></Input>
      <Button type={"submit"}>Sign In</Button>
    </form>
  );
};

export default FormChangePassword;
