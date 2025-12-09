import React, { FC } from "react";
import { supabase } from "../../api/supabaseClient";

const ResetPassword: React.FC = () => {

    
  const handleReset = async () => {
    let { data, error } = await supabase.auth.resetPasswordForEmail(email);
  };

  return <div>Reset Password</div>;
};

export default ResetPassword;
