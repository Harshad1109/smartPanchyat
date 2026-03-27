import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { grievanceService } from "../../services/api";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Bell, LogOut, User, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function OfficerDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUser({ name: payload.name || "Officer", role: payload.role });
        } catch (e) {
            console.error("Failed to parse token");
        }
    }
    const fetchGrievances = async () => {
        try {
            const res = await grievanceService.getAll();
            setComplaints(res.data.data.map(g => ({
                id: g._id,
                citizen: g.citizenId?.name || 'Unknown',
                category: g.category,
                status: g.status,
                priority: g.priority,
                deadline: g.deadline ? new Date(g.deadline).toISOString().split('T')[0] : 'N/A',
                overdue: g.isOverdue,
                raw: g
            })));
        } catch (err) {
            console.error("Failed to load grievances", err);
            // If unauthorized, redirect to login
            if (err.response && err.response.status === 401) {
                 navigate('/officer/login');
            }
        } finally {
            setLoading(false);
        }
    };
    fetchGrievances();
  }, [navigate]);

  const stats = [
    { label: t("Total Complaints"), value: complaints.length, color: "bg-blue-500" },
    { label: t("Pending"), value: complaints.filter(c => c.status === 'Pending').length, color: "bg-[#ff9800]" },
    { label: t("In Progress"), value: complaints.filter(c => c.status === 'In Progress').length, color: "bg-[#2196f3]" },
    { label: t("Overdue"), value: complaints.filter(c => c.overdue).length, color: "bg-red-500" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-[#ff9800] text-white";
      case "In Progress":
        return "bg-[#2196f3] text-white";
      case "Resolved":
        return "bg-[#4caf50] text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <div className="bg-[#145C38] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold">
                {t("Panchayat Officer Dashboard")}
              </h1>
              <p className="text-sm opacity-90">
                {t("Officer:")} {user?.name || "Suresh Patil"} | {t("Panchayat Office 1")}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher className="bg-white/10 text-white border-transparent hover:bg-white/20" />
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  8
                </span>
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <User className="h-5 w-5" />
              </Button>
              <Link to="/officer/login">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-2">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-full`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="border-2 mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={t("Filter by Category")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("All Categories")}</SelectItem>
                  <SelectItem value="road">{t("Road")}</SelectItem>
                  <SelectItem value="water">{t("Water Supply")}</SelectItem>
                  <SelectItem value="electricity">{t("Electricity")}</SelectItem>
                  <SelectItem value="sanitation">{t("Sanitation")}</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={t("Filter by Status")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("All Status")}</SelectItem>
                  <SelectItem value="pending">{t("Pending")}</SelectItem>
                  <SelectItem value="progress">{t("In Progress")}</SelectItem>
                  <SelectItem value="resolved">{t("Resolved")}</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={t("Filter by Priority")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("All Priorities")}</SelectItem>
                  <SelectItem value="high">{t("High")}</SelectItem>
                  <SelectItem value="medium">{t("Medium")}</SelectItem>
                  <SelectItem value="low">{t("Low")}</SelectItem>
                </SelectContent>
              </Select>

              <Button className="bg-[#1E7F4E] hover:bg-[#145C38] text-white">
                {t("Apply Filters")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Complaints Table */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>{t("Assigned Complaints")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("Grievance ID")}</TableHead>
                  <TableHead>{t("Citizen Name")}</TableHead>
                  <TableHead>{t("Category")}</TableHead>
                  <TableHead>{t("Status")}</TableHead>
                  <TableHead>{t("Priority")}</TableHead>
                  <TableHead>{t("Deadline")}</TableHead>
                  <TableHead>{t("Actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                     <TableCell colSpan={7} className="text-center py-8">{t("Loading...")}</TableCell>
                  </TableRow>
                ) : complaints.length === 0 ? (
                  <TableRow>
                     <TableCell colSpan={7} className="text-center py-8">{t("No complaints found.")}</TableCell>
                  </TableRow>
                ) : (
                  complaints.map((complaint) => (
                    <TableRow
                      key={complaint.id}
                      className={complaint.overdue ? "bg-red-50" : ""}
                    >
                      <TableCell>{complaint.id.substring(0, 8)}...
                        {complaint.overdue && (
                          <AlertCircle className="inline ml-2 h-4 w-4 text-red-500" />
                        )}
                      </TableCell>
                      <TableCell>{complaint.citizen}</TableCell>
                      <TableCell>{t(complaint.category)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(complaint.status)}>
                          {t(complaint.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{t(complaint.priority)}</Badge>
                      </TableCell>
                      <TableCell
                        className={
                          complaint.overdue ? "text-red-600 font-medium" : ""
                        }
                      >
                        {complaint.deadline}
                      </TableCell>
                      <TableCell>
                        <Link to={`/officer/grievance/${complaint.id}`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-[#1E7F4E] border-[#1E7F4E]"
                          >
                            {t("View Details")}
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
