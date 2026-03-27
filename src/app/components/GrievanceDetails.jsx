import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { grievanceService } from "../../services/api";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ArrowLeft, MapPin, Image as ImageIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function GrievanceDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [grievance, setGrievance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
     const fetchDetails = async () => {
         try {
             const res = await grievanceService.getById(id);
             setGrievance(res.data.data);
             setStatus(res.data.data.status);
         } catch (err) {
             console.error(err);
             toast.error("Failed to load grievance details");
         } finally {
             setLoading(false);
         }
     };
     fetchDetails();
  }, [id]);

  const handleUpdate = async () => {
      if (!status || status === grievance.status) return;
      setUpdateLoading(true);
      try {
          await grievanceService.updateStatus(id, status);
          toast.success("Status updated successfully");
          setGrievance(prev => ({ ...prev, status }));
      } catch (err) {
          toast.error(err.response?.data?.error || "Failed to update status");
      } finally {
          setUpdateLoading(false);
      }
  };

  if (loading) return <div className="text-center py-20">{t("Loading...")}</div>;
  if (!grievance) return <div className="text-center py-20">{t("Grievance not found.")}</div>;

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <div className="bg-[#145C38] text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/officer/dashboard"
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
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-2">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{t("Grievance Details")}</CardTitle>
                    <p className="text-gray-600 mt-1">{t("ID:")} {id.substring(0,8)}...</p>
                  </div>
                  <Badge className="bg-[#2196f3] text-white text-base px-4 py-1">
                    {t(grievance.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">{t("Category")}</p>
                    <p className="font-medium">{t(grievance.category)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t("Priority")}</p>
                    <Badge
                      variant="outline"
                      className="text-red-600 border-red-600"
                    >
                      {t(grievance.priority)}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t("Citizen Name")}</p>
                    <p className="font-medium">{grievance.citizenId?.name || 'Unknown'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t("Contact")}</p>
                    <p className="font-medium">{grievance.contactMobile}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t("Submitted On")}</p>
                    <p className="font-medium">{new Date(grievance.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t("Deadline")}</p>
                    <p className={`font-medium ${grievance.isOverdue ? 'text-red-600' : ''}`}>
                         {grievance.deadline ? new Date(grievance.deadline).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">{t("Description")}</p>
                  <p className="text-base bg-gray-50 p-4 rounded">
                     {grievance.description}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">{t("Location")}</p>
                  <div className="flex items-center gap-2 bg-gray-50 p-4 rounded">
                    <MapPin className="h-5 w-5 text-[#1E7F4E]" />
                    <p>{grievance.location.address}</p>
                  </div>
                  <div className="mt-3 bg-gray-300 h-48 rounded flex items-center justify-center">
                    <p className="text-gray-600">
                      {t("Map View")}
                      {grievance.location.coordinates && 
                         ` (GPS: ${grievance.location.coordinates[1]}° N, ${grievance.location.coordinates[0]}° E)`}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">{t("Uploaded Images")}</p>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="bg-gray-200 h-32 rounded flex items-center justify-center"
                      >
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>{t("Action History")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-[#4caf50] pl-4">
                  <p className="font-medium">{t("Assigned to Field Officer")}</p>
                  <p className="text-sm text-gray-600">
                    January 8, 2026, 2:15 PM by Admin
                  </p>
                </div>
                <div className="border-l-4 border-[#2196f3] pl-4">
                  <p className="font-medium">{t("Site Inspection Completed")}</p>
                  <p className="text-sm text-gray-600">
                    January 9, 2026, 9:00 AM by Suresh Patil
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    Inspection completed. Road repair work initiated.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Panel */}
          <div className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>{t("Quick Actions")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t("Assign to Field Officer")}
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={t("Select officer")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="officer1">Suresh Patil</SelectItem>
                      <SelectItem value="officer2">Rajesh Sharma</SelectItem>
                      <SelectItem value="officer3">Anil Deshmukh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("Update Status")}</label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("Change status")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">{t("Pending")}</SelectItem>
                      <SelectItem value="In Progress">{t("In Progress")}</SelectItem>
                      <SelectItem value="Resolved">{t("Resolved")}</SelectItem>
                      <SelectItem value="Escalated">{t("Escalated")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("Add Remarks")}</label>
                  <Textarea
                    placeholder={t("Enter your remarks or updates...")}
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <Button 
                   onClick={handleUpdate} 
                   disabled={updateLoading} 
                   className="w-full bg-[#1E7F4E] hover:bg-[#145C38] text-white"
                >
                  {updateLoading ? t("Updating...") : t("Update Complaint")}
                </Button>

                <Link to={`/officer/resolution/${id}`} className="block">
                  <Button className="w-full bg-[#145C38] hover:bg-[#0f4529] text-white">
                    {t("Mark as Resolved")}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
