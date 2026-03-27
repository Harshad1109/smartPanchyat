import { Link } from "react-router-dom";
import { Button } from "./ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Bell, LogOut, User, Scale } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function AppellateDashboard() {
  const { t } = useTranslation();
  const stats = [
    { label: t("Total Appeals"), value: "42", color: "bg-purple-500" },
    { label: t("Under Review"), value: "15", color: "bg-[#ff9800]" },
    { label: t("Escalated"), value: "8", color: "bg-red-500" },
    { label: t("Closed"), value: "19", color: "bg-[#4caf50]" },
  ];

  const appeals = [
    {
      id: "GRV2026001",
      citizen: "Ramesh Kumar",
      category: "Water Supply",
      escalationDate: "2026-01-07",
      status: "Not Satisfied",
      previousResolution: "Work completed but issue persists",
    },
    {
      id: "GRV2026002",
      citizen: "Sunita Devi",
      category: "Road",
      escalationDate: "2026-01-06",
      status: "Under Review",
      previousResolution: "Marked resolved but incomplete",
    },
    {
      id: "GRV2026003",
      citizen: "Raj Sharma",
      category: "Sanitation",
      escalationDate: "2026-01-05",
      status: "Not Satisfied",
      previousResolution: "Citizen unsatisfied with quality",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <div className="bg-[#5c2684] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Scale className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-semibold">
                  {t("Appellate Authority Dashboard")}
                </h1>
                <p className="text-sm opacity-90">
                  {t("Higher Authority Review Panel")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher className="bg-white/10 text-white border-transparent hover:bg-white/20" />
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <User className="h-5 w-5" />
              </Button>
              <Link to="/">
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

        {/* Search and Filters */}
        <Card className="border-2 mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder={t("Search by Grievance ID or Citizen Name...")}
                  className="h-12"
                />
              </div>
              <Select>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder={t("Filter by Status")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("All Status")}</SelectItem>
                  <SelectItem value="review">{t("Under Review")}</SelectItem>
                  <SelectItem value="escalated">{t("Escalated")}</SelectItem>
                  <SelectItem value="closed">{t("Closed")}</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder={t("Sort By")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">{t("Newest First")}</SelectItem>
                  <SelectItem value="oldest">{t("Oldest First")}</SelectItem>
                  <SelectItem value="priority">{t("By Priority")}</SelectItem>
                </SelectContent>
              </Select>
              <Button className="h-12 bg-[#5c2684] hover:bg-[#4a1f69] text-white">
                {t("Apply")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Escalated Grievances Table */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>{t("Escalated Grievances for Review")}</CardTitle>
            <p className="text-sm text-gray-600">
              {t("Cases marked as \"Not Satisfied\" by citizens requiring higher authority review")}
            </p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("Grievance ID")}</TableHead>
                  <TableHead>{t("Citizen Name")}</TableHead>
                  <TableHead>{t("Category")}</TableHead>
                  <TableHead>{t("Escalation Date")}</TableHead>
                  <TableHead>{t("Status")}</TableHead>
                  <TableHead>{t("Previous Resolution")}</TableHead>
                  <TableHead>{t("Actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appeals.map((appeal) => (
                  <TableRow key={appeal.id}>
                    <TableCell className="font-medium">{appeal.id}</TableCell>
                    <TableCell>{appeal.citizen}</TableCell>
                    <TableCell>{t(appeal.category)}</TableCell>
                    <TableCell>{appeal.escalationDate}</TableCell>
                    <TableCell>
                      <Badge className="bg-red-500 text-white">
                        {t(appeal.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {appeal.previousResolution}
                    </TableCell>
                    <TableCell>
                      <Link to={`/appellate/review/${appeal.id}`}>
                        <Button
                          size="sm"
                          className="bg-[#5c2684] hover:bg-[#4a1f69] text-white"
                        >
                          {t("Review Case")}
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Guidelines */}
        <Card className="border-2 mt-6 bg-purple-50">
          <CardContent className="p-6">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Scale className="h-5 w-5 text-purple-600" />
              {t("Appellate Review Guidelines")}
            </h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>
                • {t("Review citizen feedback and previous action history thoroughly")}
              </li>
              <li>• {t("Conduct independent assessment if required")}</li>
              <li>
                • {t("Authority to overrule previous decisions and order re-work")}
              </li>
              <li>• {t("Final decision is binding on all parties")}</li>
              <li>• {t("Target: Complete review within 7 working days")}</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
