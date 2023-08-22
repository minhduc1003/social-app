import React from "react";
import Layout from "../../../LayoutCustom";
import FormChangePassword from "./Form";

const ChangePassword = ({ params }: { params: { slug: string } }) => {
  return (
    <Layout page="forgotPassword">
      <FormChangePassword id={params.slug}></FormChangePassword>
    </Layout>
  );
};

export default ChangePassword;
