

import { toast } from 'sonner';

const handleLogout = async (router) => {
  const res = await fetch("/api/logout", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' }
  });

  if (res.status === 200) {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    toast.success("Logout successful");
    setTimeout(() => router.push("/"), 1000);
  } else {
    toast.error("Logout failed");
  }
};

export default handleLogout;
