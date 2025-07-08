
'use client'

import Link from "next/link";
import { FaUserDoctor } from "react-icons/fa6";

const Login = () => {

  return (
    <div>
      <Link href={"/login"} className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-primary flex items-center justify-center">
        <FaUserDoctor className="text-white" />
      </Link>
    </div>
  )
}

export default Login;
