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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function CitizenRegister() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [village, setVillage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        if (data.password !== data['confirm-password']) {
            throw new Error("Passwords do not match");
        }

        await authService.register({
            name: data.fullname,
            phone: data.mobile,
            email: data.email,
            password: data.password,
            panchayatWard: village,
            role: 'citizen'
        });

        navigate("/citizen/login");
    } catch (err) {
        setError(err.response?.data?.error || err.message || "Registration failed");
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
              <span className="text-4xl">📝</span>
            </div>
            <CardTitle className="text-2xl">{t("Citizen Registration")}</CardTitle>
            <CardDescription className="text-base">
              {t("Create your Smart Panchayat account")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              {error && <div className="text-red-500 text-sm p-2 bg-red-50 rounded">{error}</div>}
              <div className="space-y-2">
                <Label htmlFor="fullname">{t("Full Name")}</Label>
                <Input
                  id="fullname"
                  name="fullname"
                  placeholder={t("Enter your full name")}
                  className="h-12 text-base border-gray-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile">{t("Mobile Number")}</Label>
                <Input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  placeholder={t("Enter 10-digit mobile number")}
                  maxLength={10}
                  className="h-12 text-base border-gray-300"
                  required
                />

                <p className="text-xs text-gray-500">
                  {t("You will receive OTP on this number")}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t("Email Address (Optional)")}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("Enter email address")}
                  className="h-12 text-base border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="village">{t("Village/Panchayat")}</Label>
                <Select onValueChange={setVillage} required>
                  <SelectTrigger className="h-12 text-base border-gray-300">
                    <SelectValue placeholder={t("Select your village/panchayat")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="village1">
                      {t("Village Panchayat 1")}
                    </SelectItem>
                    <SelectItem value="village2">
                      {t("Village Panchayat 2")}
                    </SelectItem>
                    <SelectItem value="village3">
                      {t("Village Panchayat 3")}
                    </SelectItem>
                    <SelectItem value="village4">
                      {t("Village Panchayat 4")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t("Password")}</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder={t("Create password")}
                  className="h-12 text-base border-gray-300"
                  required
                />

                <p className="text-xs text-gray-500">{t("Minimum 6 characters")}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">{t("Confirm Password")}</Label>
                <Input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  placeholder={t("Re-enter password")}
                  className="h-12 text-base border-gray-300"
                  required
                />
              </div>

              <div className="flex items-start space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-[#1E7F4E] focus:ring-[#1E7F4E]"
                  required
                />

                <label htmlFor="terms" className="text-sm text-gray-600">
                  {t("I agree to the")}{" "}
                  <a href="#" className="text-[#1E7F4E] hover:underline">
                    {t("Terms and Conditions")}
                  </a>{" "}
                  {t("and")}{" "}
                  <a href="#" className="text-[#1E7F4E] hover:underline">
                    {t("Privacy Policy")}
                  </a>
                </label>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[#1E7F4E] hover:bg-[#145C38] text-white text-base"
              >
                {loading ? t("Registering...") : t("Register")}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {t("Already have an account?")}{" "}
                <Link
                  to="/citizen/login"
                  className="text-[#1E7F4E] font-medium hover:underline"
                >
                  {t("Login Now")}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
