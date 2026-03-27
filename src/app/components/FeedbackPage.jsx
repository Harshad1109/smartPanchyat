import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Star, ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function FeedbackPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [satisfaction, setSatisfaction] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/citizen/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <div className="bg-[#1E7F4E] text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/citizen/dashboard"
            className="flex items-center gap-2 text-white hover:opacity-90"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>{t("Back to Dashboard")}</span>
          </Link>
          <LanguageSwitcher className="absolute top-4 right-4 bg-white/20 text-white border-transparent hover:bg-white/30" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <CardTitle>{t("Grievance Feedback")}</CardTitle>
            <p className="text-gray-600">{t("Grievance ID")}: {id || "GRV2026001"}</p>
            <p className="text-sm text-gray-500 mt-2">
              {t("Your feedback helps us improve our services and ensures accountability")}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Satisfaction Question */}
              <div className="space-y-3">
                <Label className="text-base">
                  {t("Are you satisfied with the resolution?")}
                </Label>
                <RadioGroup
                  value={satisfaction}
                  onValueChange={setSatisfaction}
                  required
                >
                  <div className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:bg-[#e8f5e9] cursor-pointer">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes" className="cursor-pointer flex-1">
                      <span className="font-medium text-lg">{t("Yes")}</span>
                      <p className="text-sm text-gray-600">
                        {t("The problem has been resolved satisfactorily")}
                      </p>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:bg-red-50 cursor-pointer">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no" className="cursor-pointer flex-1">
                      <span className="font-medium text-lg">{t("No")}</span>
                      <p className="text-sm text-gray-600">
                        {t("The problem is not resolved or partially resolved")}
                      </p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Rating */}
              <div className="space-y-3">
                <Label className="text-base">{t("Rate the service quality")}</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-2 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`h-10 w-10 ${
                          star <= rating
                            ? "fill-[#ff9800] text-[#ff9800]"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{t("Poor")}</span>
                  <span>{t("Excellent")}</span>
                </div>
              </div>

              {/* Comments */}
              <div className="space-y-2">
                <Label htmlFor="comments">
                  {t("Additional Comments or Suggestions")}
                </Label>
                <Textarea
                  id="comments"
                  placeholder={t("Share your experience and suggestions for improvement...")}
                  rows={5}
                  className="resize-none"
                />
              </div>

              {/* Escalation Notice */}
              {satisfaction === "no" && (
                <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                  <p className="text-sm font-medium text-yellow-800 mb-1">
                    {t("⚠️ Escalation to Appellate Authority")}
                  </p>
                  <p className="text-xs text-yellow-700">
                    {t("Since you are not satisfied with the resolution, your grievance will be automatically escalated to the Appellate Authority for review within 3 working days.")}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-[#1E7F4E] hover:bg-[#145C38] text-white"
                disabled={!satisfaction || rating === 0}
              >
                {t("Submit Feedback")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
