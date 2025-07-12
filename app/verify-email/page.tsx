"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const params = useSearchParams();
  const token = params.get("token");
  const email = params.get("email");
  const router = useRouter();
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    const verify = async () => {
      const res = await fetch(`/api/auth/verify-email?token=${token}&email=${email}`);
      const data = await res.json();

      if (res.ok) {
        setMessage("Email verified successfully. Redirecting...");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setMessage(data.message || "Verification failed.");
      }
    };

    if (token && email) verify();
  }, [token, email, router]);

  return <p>{message}</p>;
}
