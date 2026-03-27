import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function FinalAppealReview() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/appellate/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <div className="bg-[#5c2684] text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/appellate/dashboard"
            className="flex items-center gap-2 text-white hover:opacity-90"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>{t("Back to Dashboard")}</span>
          </Link>
          <LanguageSwitcher className="absolute top-4 right-4 bg-white/20 text-white border-transparent hover:bg-white/30" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Review Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Grievance Overview */}
            <Card className="border-2">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{t("Appeal Review Case")}</CardTitle>
                    <p className="text-gray-600 mt-1">{t("Grievance ID")}: {id}</p>
                  </div>
                  <Badge className="bg-red-500 text-white text-base px-4 py-1">
                    {t("Not Satisfied")}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">{t("Citizen Name")}</p>
                    <p className="font-medium">Ramesh Kumar</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t("Category")}</p>
                    <p className="font-medium">{t("Water Supply")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t("Original Submission")}</p>
                    <p className="font-medium">January 5, 2026</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t("Escalation Date")}</p>
                    <p className="font-medium">January 7, 2026</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {t("Original Complaint")}
                  </p>
                  <p className="text-base bg-gray-50 p-3 rounded">
                    Irregular water supply in our area. Water comes only for 2
                    hours in morning. Many households facing severe water
                    shortage problems.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Previous Actions */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>{t("Previous Action History")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <p className="font-medium">{t("Assigned to Officer")}</p>
                    <p className="text-sm text-gray-600">
                      Jan 5, 2026 - Assigned to Suresh Patil
                    </p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4 py-2">
                    <p className="font-medium">{t("Site Inspection")}</p>
                    <p className="text-sm text-gray-600">
                      Jan 6, 2026 - Field inspection completed
                    </p>
                    <p className="text-sm mt-1">
                      Officer remarks: "Water tank cleaned and valve repaired"
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4 py-2">
                    <p className="font-medium">{t("Marked as Resolved")}</p>
                    <p className="text-sm text-gray-600">
                      Jan 6, 2026 - Complaint closed
                    </p>
                    <p className="text-sm mt-1">
                      Resolution: "Water tank maintenance completed. Supply
                      restored."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Citizen Feedback */}
            <Card className="border-2 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  {t("Citizen Feedback (Not Satisfied)")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{t("Rating Given")}</p>
                    <p className="text-2xl">⭐⭐ (2/5)</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      {t("Citizen Comments")}
                    </p>
                    <p className="text-base">
                      "Tank cleaning was done but water supply issue not
                      resolved. Still getting water for only 2-3 hours. The main
                      pipeline problem was not addressed. Officer only did
                      surface level work."
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      Feedback Date: January 7, 2026
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Decision Panel */}
          <div className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>{t("Appellate Decision")}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Decision */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">
                      {t("Final Decision")}
                    </Label>
                    <RadioGroup required>
                      <div className="flex items-center space-x-3 p-3 border-2 rounded-lg">
                        <RadioGroupItem value="uphold" id="uphold" />
                        <Label
                          htmlFor="uphold"
                          className="cursor-pointer flex-1"
                        >
                          <span className="font-medium">
                            {t("Uphold Original Resolution")}
                          </span>
                          <p className="text-xs text-gray-600">
                            {t("Work was satisfactory")}
                          </p>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 border-2 rounded-lg bg-orange-50">
                        <RadioGroupItem value="rework" id="rework" />
                        <Label
                          htmlFor="rework"
                          className="cursor-pointer flex-1"
                        >
                          <span className="font-medium">{t("Order Re-work")}</span>
                          <p className="text-xs text-gray-600">
                            {t("Require additional action")}
                          </p>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 border-2 rounded-lg bg-red-50">
                        <RadioGroupItem value="reassign" id="reassign" />
                        <Label
                          htmlFor="reassign"
                          className="cursor-pointer flex-1"
                        >
                          <span className="font-medium">
                            {t("Reassign & Escalate")}
                          </span>
                          <p className="text-xs text-gray-600">
                            {t("Assign to senior officer")}
                          </p>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Remarks */}
                  <div className="space-y-2">
                    <Label htmlFor="decision-remarks">{t("Decision Remarks *")}</Label>
                    <Textarea
                      id="decision-remarks"
                      placeholder={t("Provide detailed reasoning for your decision...")}
                      rows={6}
                      className="resize-none"
                      required
                    />

                    <p className="text-xs text-gray-500">
                      {t("These remarks will be shared with all parties")}
                    </p>
                  </div>

                  {/* Additional Actions */}
                  <div className="space-y-2">
                    <Label htmlFor="actions">{t("Directed Actions (if any)")}</Label>
                    <Textarea
                      id="actions"
                      placeholder={t("Specific actions to be taken...")}
                      rows={4}
                      className="resize-none"
                    />
                  </div>

                  {/* Timeline */}
                  <div className="space-y-2">
                    <Label htmlFor="timeline">{t("Completion Timeline")}</Label>
                    <select
                      id="timeline"
                      className="w-full h-12 px-3 border rounded-md"
                    >
                      <option value="7">{t("7 Days")}</option>
                      <option value="14">{t("14 Days")}</option>
                      <option value="21">{t("21 Days")}</option>
                      <option value="30">{t("30 Days")}</option>
                    </select>
                  </div>

                  {/* Authority Stamp */}
                  <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-lg">
                    <p className="text-sm font-medium text-purple-800 mb-2">
                      {t("⚖️ Appellate Authority Decision")}
                    </p>
                    <p className="text-xs text-purple-700">
                      {t("This decision is final and binding on all parties. The grievance will be closed after implementation of directed actions.")}
                    </p>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="w-full h-12 bg-[#5c2684] hover:bg-[#4a1f69] text-white"
                  >
                    {t("Submit Final Decision")}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Guidelines Card */}
            <Card className="border-2 bg-gray-50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-sm mb-2">
                  {t("Review Guidelines")}
                </h4>
                <ul className="space-y-1 text-xs text-gray-700">
                  <li>• Consider both citizen feedback and officer actions</li>
                  <li>• Verify resolution proof if available</li>
                  <li>• Decision should be impartial and evidence-based</li>
                  <li>• Can order field verification if needed</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
