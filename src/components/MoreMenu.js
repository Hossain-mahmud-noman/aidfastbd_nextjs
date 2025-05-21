'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FaUser, FaCalendarAlt, FaHeart, FaInfoCircle, FaShieldAlt, FaLock,
  FaHistory, FaSignInAlt, FaSignOutAlt
} from 'react-icons/fa';
import { MdOutlinePolicy } from 'react-icons/md';
import { toast, Toaster } from 'sonner';
const MoreMenu = ({ token = "" }) => {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch("/api/logout", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' }
    });

    if (res.status === 200) {
      toast.success("Logout successful");
      setTimeout(() => router.push("/"), 1000);
    } else {
      toast.error("Logout failed");
    }
  };

  const MenuItem = ({ icon, text, href = "", onClick }) => {
    const content = (
      <div
        className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100"
        onClick={onClick}
      >
        <div className="text-xl text-gray-600">{icon}</div>
        <span className="text-gray-700 font-medium">{text}</span>
      </div>
    );

    return href && href !== "/logout" ? <Link href={href}>{content}</Link> : content;
  };

  return (
    <div className="min-h-screen mt-6">
      <Toaster position="top-right" />
      {token !== "" && (
        <div className="mb-4">
          <h3 className="font-semibold text-gray-500 mb-3">General</h3>
          <div className="space-y-2">
            <MenuItem icon={<FaUser />} href="/profile" text="Profile" />
            <MenuItem icon={<FaCalendarAlt />} href="/appointments" text="Appointments" />
            <MenuItem icon={<FaHistory />} href="/appointments/history" text="Appointment History" />
            <MenuItem icon={<FaHeart />} href="/favorite" text="Favorite" />
          </div>
        </div>
      )}

      <div className="mb-4 shadow-custom-light p-4 rounded-md">
        <h3 className="font-semibold text-gray-500 mb-3">Info</h3>
        <div className="space-y-2">
          <MenuItem icon={<FaInfoCircle />} href="/about" text="About Us" />
          <MenuItem icon={<FaShieldAlt />} href="/privacy" text="Privacy Policy" />
          <MenuItem icon={<MdOutlinePolicy />} href="/terms" text="Terms & Conditions" />
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-gray-500 mb-3">Other</h3>
        <div className="space-y-2 shadow-custom-light p-2 rounded-md">
          {token === "" ? (
            <MenuItem icon={<FaSignInAlt />} href="/login" text="Login" />
          ) : (
            <>
              <MenuItem icon={<FaLock />} href="/reset" text="Reset Password" />
              <MenuItem icon={<FaSignOutAlt />} text="Logout" onClick={handleLogout} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoreMenu;
