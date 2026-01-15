import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../lib/store/authStore";
import AuthLayout from "../components/layout/AuthLayout";

export default function AuthWrapper() {
  const navigate = useNavigate();
  const { isAuthenticated, checkingAuth, checkAuth } = useAuthStore();

  // 1) check auth once when wrapper mounts
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // 2) redirect only after we know the result
  useEffect(() => {
    if (!checkingAuth && !isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [checkingAuth, isAuthenticated, navigate]);

  if (checkingAuth) return null; // or a loader
  if (!isAuthenticated) return null;

  return <AuthLayout />;
}
