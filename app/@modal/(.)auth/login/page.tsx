import { InterceptedModal } from "@/components/forms/interceptedModal";
import LoginForm from "@/components/forms/loginForm";
import { Typography } from "@/components/ui/typography";

const InterceptedLoginPage = () => {
  return (
    <InterceptedModal>
      <Typography variant="h2">Welcome to Admin Template</Typography>
      <Typography variant="p">Please fill in the details below to login to the system</Typography>
      <LoginForm />
    </InterceptedModal>
  );
}

export default InterceptedLoginPage;