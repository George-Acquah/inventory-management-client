import LoginForm from "@/components/forms/loginForm";
import { Typography } from "@/components/ui/typography";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

const Login = () => {

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="text-center mb-8">
        <Typography variant="h2">Welcome to Admin Template</Typography>
        <Typography variant="p">
          Please fill in the details below to login to the system
        </Typography>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
