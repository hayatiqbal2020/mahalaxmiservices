import { Suspense } from "react";
import { LoginForm } from "@/components/admin/AuthForms";

export default function LoginPage() {
  return (
    <>
      <h1>Admin Login</h1>
      <p className="sub">Mahalaxmi Services staff only</p>
      <Suspense>
        <LoginForm />
      </Suspense>
    </>
  );
}
