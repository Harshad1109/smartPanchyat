import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function OfficerLogin() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        // We use the same generic login endpoint, assuming official-id maps to the phone field or handles roles
        const res = await authService.login({ phone: data.officialId, password: data.password });
        
        if (res.data.user.role !== 'officer' && res.data.user.role !== 'admin') {
             throw new Error("Access denied. Not an officer account.");
        }

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userRole", res.data.user.role);
        navigate("/officer/dashboard");
    } catch (err) {
        setError(err.response?.data?.error || err.message || "Login failed");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <div className="bg-[#145C38] text-white py-4">
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
              <span className="text-4xl">👨‍💼</span>
            </div>
            <CardTitle className="text-2xl">{t("Panchayat Officer Login")}</CardTitle>
            <CardDescription className="text-base">
              {t("Secure access for government officials")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && <div className="text-red-500 text-sm p-2 bg-red-50 rounded">{error}</div>}
              <div className="space-y-2">
                <Label htmlFor="official-id">{t("Official ID / Email")}</Label>
                <Input
                  id="official-id"
                  name="officialId"
                  placeholder={t("Enter official mobile or ID")}
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
                  placeholder={t("Enter secure password")}
                  className="h-12 text-base border-gray-300"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-gray-300 text-[#1E7F4E] focus:ring-[#1E7F4E]"
                />

                <label htmlFor="remember" className="text-sm text-gray-600">
                  {t("Keep me signed in")}
                </label>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[#145C38] hover:bg-[#0f4529] text-white text-base"
              >
                {loading ? t("Authenticating...") : t("Secure Login")}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-500 mb-3">{t("Other portals")}</p>
              <div className="space-y-2">
                <Link to="/citizen/login" className="block">
                  <Button variant="outline" className="w-full text-sm">
                    {t("Citizen Portal")}
                  </Button>
                </Link>
                <Link to="/appellate/dashboard" className="block">
                  <Button variant="outline" className="w-full text-sm">
                    {t("Appellate Authority")}
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
