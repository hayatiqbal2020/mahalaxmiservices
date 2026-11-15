import { ForgotForm } from "@/components/admin/AuthForms";

export default function ForgotPasswordPage() {
  return (
    <>
      <h1>Forgot Password</h1>
      <p className="sub">Enter your email and we will send you a reset link.</p>
      <ForgotForm />
    </>
  );
}
