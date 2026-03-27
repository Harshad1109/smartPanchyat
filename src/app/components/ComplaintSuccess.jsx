import { Link, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function ComplaintSuccess() {
  const { t } = useTranslation();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center p-4 relative">
      <LanguageSwitcher className="absolute top-4 right-4 bg-white/50 border hover:bg-white" />
      <Card className="max-w-md w-full border-2 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="w-20 h-20 bg-[#4caf50] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {t("Complaint Submitted Successfully!")}
          </h2>

          <p className="text-gray-600 mb-6">
            {t("Your grievance has been registered and will be reviewed by the Panchayat office shortly.")}
          </p>

          <div className="bg-[#e8f5e9] border-2 border-[#4caf50] rounded-lg p-6 mb-6">
            <p className="text-sm text-gray-600 mb-2">{t("Your Grievance ID")}</p>
            <p className="text-3xl font-bold text-[#1E7F4E] mb-4">
              {id || "GRV2026006"}
            </p>
            <p className="text-xs text-gray-500">
              {t("Please save this ID for future reference")}
            </p>
          </div>

          <div className="space-y-3 mb-6 text-left">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">{t("Assigned Department:")}</span>
              <span className="font-medium">Public Works</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">{t("Expected Resolution:")}</span>
              <span className="font-medium">21 Days</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">{t("Status Updates:")}</span>
              <span className="font-medium text-[#1E7F4E]">SMS & Email</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link to={`/citizen/track-complaint?id=${id}`} className="w-full">
              <Button className="w-full h-12 bg-[#1E7F4E] hover:bg-[#145C38] text-white">
                {t("Track Complaint")}
              </Button>
            </Link>
            <Link to="/citizen/dashboard" className="w-full">
              <Button variant="outline" className="w-full h-12 border-gray-300">
                {t("Go to Dashboard")}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
