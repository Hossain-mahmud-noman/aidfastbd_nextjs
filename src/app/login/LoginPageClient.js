"use client";

import { useSearchParams } from "next/navigation";
import LoginForm from "../../components/forms/LoginForm";

const LoginPageClient = () => {
   const searchParams = useSearchParams();
   const slug = searchParams.get("slug");
   const id = searchParams.get("id");

   return <LoginForm slug={slug} id={id} />;
}

export default LoginPageClient
