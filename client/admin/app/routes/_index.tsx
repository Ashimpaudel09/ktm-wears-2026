import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../lib/schemas/auth.schema";
import { LogIn, Lock, User } from "lucide-react";
import toast from "react-hot-toast";

import api from "~/lib/api/axios";
import InputError from "~/components/ui/input-error";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useAuthStore } from "~/lib/store/authStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { checkAuth, isAuthenticated } = useAuthStore();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      await api.post("/auth/login", data);
      await checkAuth();
      console.log(isAuthenticated);

      toast.success("Login successful!");
      navigate("/dashboard", { replace: true });
    } catch {
      toast.error("Invalid username or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div>Logo</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to access your admin dashboard
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label>Username</Label>
              <Input
                type="text"
                {...register("username")}
                placeholder="Enter your username"
                icon={User}
                error={!!errors.username}
              />
              {errors.username && (
                <InputError message={errors.username.message!} />
              )}
            </div>

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                {...register("password")}
                placeholder="Enter your password"
                icon={Lock}
                error={!!errors.password}
              />
              {errors.password && (
                <InputError message={errors.password.message!} />
              )}
            </div>

            <Button type="submit" disabled={isLoading} className="w-full gap-2">
              {isLoading ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  Sign In
                </>
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          Ktm Wears Admin Dashboard &copy; 2026
        </p>
      </div>
    </div>
  );
}
