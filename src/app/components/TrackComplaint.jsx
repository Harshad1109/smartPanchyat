import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { grievanceService } from "../../services/api";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { ArrowLeft, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function TrackComplaint() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const grievanceId = searchParams.get("id") || "";
  const [trackingId, setTrackingId] = useState(grievanceId);
  const [showDetails, setShowDetails] = useState(!!grievanceId);

  const [grievance, setGrievance] = useState(null);
  const [loading, setLoading] = useState(!!grievanceId);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (grievanceId) {
        const fetchGrievance = async () => {
            setLoading(true);
            try {
                const res = await grievanceService.getById(grievanceId || trackingId);
                setGrievance(res.data.data);
                setTrackingId(grievanceId || trackingId);
                setShowDetails(true);
            } catch (err) {
                setError(err.response?.data?.error || "Grievance not found");
                setShowDetails(false);
            } finally {
                setLoading(false);
            }
        };
        fetchGrievance();
    }
  }, [grievanceId]);

  const handleTrack = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
        const res = await grievanceService.getById(trackingId);
        setGrievance(res.data.data);
        setShowDetails(true);
    } catch (err) {
        setError(err.response?.data?.error || "Grievance not found");
        setShowDetails(false);
    } finally {
        setLoading(false);
    }
  };

  const timeline = grievance ? [
    {
      status: "Submitted",
      date: new Date(grievance.createdAt).toLocaleString(),
      completed: true,
      remarks: "Complaint registered successfully",
    },
    ...(grievance.statusHistory || []).map(h => ({
        status: h.status,
        date: new Date(h.changedAt).toLocaleString(),
        completed: true,
        remarks: h.remarks || `Status changed to ${h.status}`
    })),
    ...(grievance.status === 'Resolved' ? [] : [{
        status: "Resolved",
        date: "Pending",
        completed: false,
        remarks: `Expected completion by: ${new Date(new Date(grievance.createdAt).getTime() + (21 * 24 * 60 * 60 * 1000)).toLocaleDateString()}`,
    }])
  ] : [];

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-500";
      case "In Progress":
        return "bg-blue-500";
      case "Resolved":
        return "bg-green-500";
      default:
        return "bg-gray-500";
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

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Search Card */}
        <Card className="border-2 shadow-lg mb-8">
          <CardHeader>
            <CardTitle>{t("Track Your Complaint")}</CardTitle>
            <p className="text-gray-600">
              {t("Enter your Grievance ID to track status")}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTrack} className="flex gap-3">
              <div className="flex-1">
                <Label htmlFor="grievance-id" className="sr-only">
                  {t("Grievance ID")}
                </Label>
                <Input
                  id="grievance-id"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder={t("Enter Grievance ID (e.g., GRV2026001)")}
                  className="h-12 text-base"
                  required
                />
              </div>
              <Button
                type="submit"
                className="h-12 px-8 bg-[#1E7F4E] hover:bg-[#145C38] text-white"
              >
                <Search className="h-5 w-5 mr-2" />
                {t("Track")}
              </Button>
            </form>
          </CardContent>
        </Card>

            {error && <div className="text-red-500 mb-4 bg-red-50 p-2 rounded border border-red-200">{error}</div>}
            {loading && <div className="text-center py-8">{t("Loading...")}</div>}
            {showDetails && grievance && (
          <>
            <Card className="border-2 shadow-lg mb-6">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{t("Complaint Details")}</CardTitle>
                    <p className="text-gray-600 mt-1">{t("ID:")} {trackingId}</p>
                  </div>
                  <Badge className={`${getStatusColor(grievance.status)} text-white text-base px-4 py-1`}>
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
                    <p className="font-medium">{t(grievance.priority)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t("Submitted On")}</p>
                    <p className="font-medium">{new Date(grievance.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t("Expected Resolution")}</p>
                    <p className="font-medium">{new Date(new Date(grievance.createdAt).getTime() + (21 * 24 * 60 * 60 * 1000)).toLocaleDateString()}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{t("Description")}</p>
                  <p className="text-base text-gray-800">
                    {grievance.description}
                  </p>
                </div>
                {grievance.resolution?.ATR && (
                   <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                      <p className="text-sm font-bold text-green-800">{t("Resolution Result")}</p>
                      <p className="text-sm text-green-700">{grievance.resolution.ATR}</p>
                   </div>
                )}
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="border-2 shadow-lg">
              <CardHeader>
                <CardTitle>{t("Status Timeline")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {timeline.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            item.completed ? "bg-[#4caf50]" : "bg-gray-300"
                          }`}
                        >
                          {item.completed ? (
                            <span className="text-white text-xl">✓</span>
                          ) : (
                            <span className="text-white text-xl">○</span>
                          )}
                        </div>
                        {index < timeline.length - 1 && (
                          <div
                            className={`w-0.5 h-16 ${
                              item.completed ? "bg-[#4caf50]" : "bg-gray-300"
                            }`}
                          />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-semibold text-lg">
                            {item.status}
                          </h4>
                          <span className="text-sm text-gray-600">
                            {item.date}
                          </span>
                        </div>
                        <p className="text-gray-600">{item.remarks}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Officer Remarks Section */}
                <div className="mt-6 p-4 bg-[#e8f5e9] rounded-lg">
                  <h4 className="font-semibold mb-2">{t("Latest Officer Remarks") || "Latest Officer Remarks"}</h4>
                  <p className="text-sm text-gray-700">
                    Field inspection completed. Road repair work has been
                    initiated. Required materials have been procured. Work
                    expected to be completed within 7-10 days.
                  </p>
                  <p className="text-xs text-gray-600 mt-2">
                    - Officer Suresh Patil, January 9, 2026
                  </p>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
