import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { grievanceService } from "../../services/api";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { MapPin, Upload, ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function RaiseGrievance() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("medium");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) {
        toast.error("Please select a grievance category");
        return;
    }

    setLoading(true);
    try {
        const formData = new FormData(e.target);
        formData.append("category", category);
        formData.append("priority", priority);
        formData.append("coordinates", JSON.stringify([77.1025, 28.7041])); // Mock static geo-cords

        files.forEach(file => {
            formData.append("media", file);
        });

        const res = await grievanceService.create(formData);
        toast.success(t("Grievance submitted successfully!"));
        navigate(`/citizen/complaint-success/${res.data.data._id}`);
    } catch (err) {
        const errorMsg = err.response?.data?.error || "Failed to submit grievance";
        toast.error(errorMsg);
    } finally {
        setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
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

      <div className="max-w-3xl mx-auto px-4 py-8">
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">{t("Raise New Grievance")}</CardTitle>
            <p className="text-gray-600">
              {t("Submit your complaint with complete details")}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category Selection */}
              <div className="space-y-2">
                <Label htmlFor="category">{t("Grievance Category *")}</Label>
                <Select required value={category} onValueChange={setCategory}>
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder={t("Select category")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="road">{t("Road & Infrastructure")}</SelectItem>
                    <SelectItem value="water">{t("Water Supply")}</SelectItem>
                    <SelectItem value="electricity">{t("Electricity")}</SelectItem>
                    <SelectItem value="sanitation">
                      {t("Sanitation & Cleanliness")}
                    </SelectItem>
                    <SelectItem value="drainage">{t("Drainage")}</SelectItem>
                    <SelectItem value="street-light">{t("Street Lights")}</SelectItem>
                    <SelectItem value="health">{t("Public Health")}</SelectItem>
                    <SelectItem value="other">{t("Other")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject">{t("Subject *")}</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder={t("Brief subject of your complaint")}
                  className="h-12 text-base"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">{t("Detailed Description *")}</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder={t("Describe your complaint in detail...")}
                  rows={6}
                  className="text-base resize-none"
                  required
                />

                <p className="text-sm text-gray-500">{t("Minimum 50 characters")}</p>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">{t("Location *")}</Label>
                <div className="flex gap-2">
                  <Input
                    id="location"
                    name="address"
                    placeholder={t("Enter location or address")}
                    className="h-12 text-base flex-1"
                    required
                  />

                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 px-4 border-[#1E7F4E] text-[#1E7F4E]"
                  >
                    <MapPin className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-sm text-[#1E7F4E]">
                  📍 {t("Current Location Detected")}: {t("Village Panchayat 1")}
                </p>
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label htmlFor="files">{t("Upload Photos/Videos (Optional)")}</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    {t("Click to upload or drag and drop")}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    {t("PNG, JPG, MP4 up to 10MB (Max 3 files)")}
                  </p>
                  <Input
                    id="files"
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  <label htmlFor="files">
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
                {files.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {files.map((file, index) => (
                      <p key={index} className="text-sm text-green-600">
                        ✓ {file.name}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-mobile">{t("Contact Mobile *")}</Label>
                  <Input
                    id="contact-mobile"
                    name="contactMobile"
                    type="tel"
                    placeholder={t("Enter mobile number")}
                    className="h-12 text-base"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">
                    {t("Contact Email (Optional)")}
                  </Label>
                  <Input
                    id="contact-email"
                    name="contactEmail"
                    type="email"
                    placeholder={t("Enter email address")}
                    className="h-12 text-base"
                  />
                </div>
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <Label htmlFor="priority">{t("Priority Level")}</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">{t("Low")}</SelectItem>
                    <SelectItem value="medium">{t("Medium")}</SelectItem>
                    <SelectItem value="high">{t("High")}</SelectItem>
                    <SelectItem value="urgent">{t("Urgent")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-[#1E7F4E] hover:bg-[#145C38] text-white text-base"
                  size="lg"
                >
                  {loading ? t("Submitting...") : t("Submit Complaint")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
