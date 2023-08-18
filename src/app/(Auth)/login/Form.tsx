"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Login } from "../types/login";
import Input from "../components/Input";
import Link from "next/link";
import Button from "../components/Button";

const Form = () => {
  const { control, handleSubmit } = useForm<Login>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const submitForm: SubmitHandler<Login> = async (data) => {
    // await axios
    //   .post(`${import.meta.env.VITE_SV}/api/user/login`, data)
    //   .then((res) => {
    //     saveCookie(res.data.token);
    //     toast.success("Sign In Successfully");
    //   })
    //   .catch((error) => {
    //     toast.error(error.response.data.error);
    //   });
  };
  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "400px",
        gap: "20px",
        borderRadius: "10px",
      }}
    >
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
      <span className="text-gray-400 flex justify-end ">
        <Link href={"/forgotPassword/email"}>Recover Password ?</Link>
      </span>
      <Button type={"submit"}>Sign In</Button>
    </form>
  );
};

export default Form;
