import Link from "next/link";
import { Button } from "../ui/button"

const LoginBtn = () => {
  return (
    <Button variant="link" size="default">
      <Link href="/auth/login">Login</Link>
    </Button>
  );
}

export default LoginBtn;