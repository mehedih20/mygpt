import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="min-h-svh flex justify-center items-center">
      <SignIn />
    </div>
  );
};

export default SignInPage;
