import { SignupForm } from "@/components/admin/AuthForms";

export default function SignupPage() {
  return (
    <>
      <h1>Create Account</h1>
      <p className="sub">An admin must activate a new account before it can log in.</p>
      <SignupForm />
    </>
  );
}
