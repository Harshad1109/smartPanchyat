import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ArrowLeft, Upload } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function ResolutionSubmission() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/officer/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <div className="bg-[#145C38] text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to={`/officer/grievance/${id}`}
            className="flex items-center gap-2 text-white hover:opacity-90"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>{t("Back to Grievance")}</span>
          </Link>
          <LanguageSwitcher className="absolute top-4 right-4 bg-white/20 text-white border-transparent hover:bg-white/30" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">{t("Submit Resolution / ATR")}</CardTitle>
            <p className="text-gray-600">{t("Grievance ID")}: {id}</p>
            <p className="text-sm text-gray-500 mt-2">
              {t("Action Taken Report (ATR) - Provide details of work completed")}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Resolution Summary */}
              <div className="space-y-2">
                <Label htmlFor="resolution-summary">{t("Resolution Summary *")}</Label>
                <Input
                  id="resolution-summary"
                  placeholder={t("Brief summary of resolution")}
                  className="h-12 text-base"
                  required
                />
              </div>

              {/* Detailed Description */}
              <div className="space-y-2">
                <Label htmlFor="resolution-detail">
                  {t("Detailed Resolution Description *")}
                </Label>
                <Textarea
                  id="resolution-detail"
                  placeholder={t("Provide detailed information about the action taken and work completed...")}
                  rows={6}
                  className="resize-none"
                  required
                />

                <p className="text-sm text-gray-500">
                  {t("Include: Work done, materials used, team involved, completion date")}
                </p>
              </div>

              {/* Completion Date */}
              <div className="space-y-2">
                <Label htmlFor="completion-date">{t("Work Completion Date *")}</Label>
                <Input
                  id="completion-date"
                  type="date"
                  className="h-12 text-base"
                  required
                />
              </div>

              {/* Cost Incurred */}
              <div className="space-y-2">
                <Label htmlFor="cost">{t("Cost Incurred (₹)")}</Label>
                <Input
                  id="cost"
                  type="number"
                  placeholder={t("Enter amount in Rupees")}
                  className="h-12 text-base"
                />
              </div>

              {/* Upload Proof */}
              <div className="space-y-2">
                <Label htmlFor="proof">{t("Upload Proof of Work Completed *")}</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    {t("Upload before/after photos or completion certificate")}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    {t("PNG, JPG up to 10MB (Max 5 files)")}
                  </p>
                  <Input
                    id="proof"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    required
                  />

                  <label htmlFor="proof">
                    <Button
                      type="button"
                      variant="outline"
                      className="cursor-pointer"
                      asChild
                    >
                      <span>{t("Choose Files")}</span>
                    </Button>
                  </label>
                </div>
              </div>

              {/* Officer Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="officer-name">{t("Officer Name *")}</Label>
                  <Input
                    id="officer-name"
                    defaultValue="Suresh Patil"
                    className="h-12 text-base"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="officer-designation">{t("Designation *")}</Label>
                  <Input
                    id="officer-designation"
                    defaultValue="Field Officer"
                    className="h-12 text-base"
                    required
                  />
                </div>
              </div>

              {/* Final Remarks */}
              <div className="space-y-2">
                <Label htmlFor="final-remarks">{t("Additional Remarks")}</Label>
                <Textarea
                  id="final-remarks"
                  placeholder={t("Any additional notes or observations...")}
                  rows={4}
                  className="resize-none"
                />
              </div>

              {/* Confirmation */}
              <div className="p-4 bg-[#e8f5e9] border-2 border-[#4caf50] rounded-lg">
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="confirm"
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-[#1E7F4E] focus:ring-[#1E7F4E]"
                    required
                  />

                  <label htmlFor="confirm" className="text-sm text-gray-700">
                    {t("I confirm that the work has been completed as per standards and the complaint has been resolved to the best of our ability. This will mark the grievance as resolved.")}
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Link to={`/officer/grievance/${id}`} className="flex-1">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12"
                  >
                    {t("Cancel")}
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="flex-1 h-12 bg-[#4caf50] hover:bg-[#388e3c] text-white"
                >
                  {t("Submit ATR & Mark Resolved")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
