import ResetForm from "@/components/admin/ResetForm";

export default function ResetPasswordPage() {
  return (
    <>
      <h1>Set New Password</h1>
      <p className="sub">Choose a password of at least 8 characters.</p>
      <ResetForm />
    </>
  );
}
