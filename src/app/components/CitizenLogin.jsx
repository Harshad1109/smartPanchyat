import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/api";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function CitizenLogin() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        // For OTP, we might just mock it or handle later. Using 'password' method for actual backend.
        if (loginMethod === "password") {
           const res = await authService.login({ phone: data.mobile, password: data.password });
           localStorage.setItem("token", res.data.token);
           localStorage.setItem("userRole", res.data.user.role);
           navigate("/citizen/dashboard");
        } else {
           // OTP Login mock
           navigate("/citizen/dashboard");
        }
    } catch (err) {
        setError(err.response?.data?.error || "Login failed");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <div className="bg-[#1E7F4E] text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-white hover:opacity-90"
          >
            <span className="text-2xl">←</span>
            <span>{t("Back to Home")}</span>
          </Link>
          <LanguageSwitcher className="absolute top-4 right-4 bg-white/20 text-white border-transparent hover:bg-white/30" />
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-12">
        <Card className="border-2 border-gray-200 shadow-lg">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-[#e8f5e9] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">👤</span>
            </div>
            <CardTitle className="text-2xl">{t("Citizen Login")}</CardTitle>
            <CardDescription className="text-base">
              {t("Access your Smart Panchayat account")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={loginMethod}
              onValueChange={setLoginMethod}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="password">{t("Password")}</TabsTrigger>
                <TabsTrigger value="otp">{t("OTP")}</TabsTrigger>
              </TabsList>

              <TabsContent value="password">
                <form onSubmit={handleLogin} className="space-y-4">
                  {error && <div className="text-red-500 text-sm p-2 bg-red-50 rounded">{error}</div>}
                  <div className="space-y-2">
                    <Label htmlFor="mobile">{t("Mobile Number or Email")}</Label>
                    <Input
                      id="mobile"
                      name="mobile"
                      placeholder={t("Enter mobile number or email")}
                      className="h-12 text-base border-gray-300"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">{t("Password")}</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder={t("Enter password")}
                      className="h-12 text-base border-gray-300"
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <a
                      href="#"
                      className="text-sm text-[#1E7F4E] hover:underline"
                    >
                      {t("Forgot Password?")}
                    </a>
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-[#1E7F4E] hover:bg-[#145C38] text-white text-base"
                  >
                    {loading ? t("Logging in...") : t("Login")}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="otp">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="mobile-otp">{t("Mobile Number")}</Label>
                    <Input
                      id="mobile-otp"
                      placeholder={t("Enter mobile number")}
                      className="h-12 text-base border-gray-300"
                      required
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12 border-[#1E7F4E] text-[#1E7F4E] hover:bg-[#e8f5e9]"
                  >
                    {t("Send OTP")}
                  </Button>
                  <div className="space-y-2">
                    <Label htmlFor="otp">{t("Enter OTP")}</Label>
                    <Input
                      id="otp"
                      placeholder={t("Enter 6-digit OTP")}
                      maxLength={6}
                      className="h-12 text-base border-gray-300"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 bg-[#1E7F4E] hover:bg-[#145C38] text-white text-base"
                  >
                    {t("Verify & Login")}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {t("Don't have an account?")}{" "}
                <Link
                  to="/citizen/register"
                  className="text-[#1E7F4E] font-medium hover:underline"
                >
                  {t("Register Now")}
                </Link>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center space-y-2">
                <p className="text-xs text-gray-500">
                  {t("Quick Access for Officials")}
                </p>
                <div className="flex gap-2">
                  <Link to="/officer/login" className="flex-1">
                    <Button variant="outline" className="w-full text-sm">
                      {t("Officer Login")}
                    </Button>
                  </Link>
                  <Link to="/appellate/dashboard" className="flex-1">
                    <Button variant="outline" className="w-full text-sm">
                      {t("Appellate Login")}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
