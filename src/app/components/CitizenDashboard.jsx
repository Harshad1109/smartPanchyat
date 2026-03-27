import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { grievanceService } from "../../services/api";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
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
  Bell, 
  FileText, 
  LogOut, 
  User, 
  LayoutDashboard, 
  Settings, 
  HelpCircle,
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  BarChart3
} from "lucide-react";
import { motion } from "motion/react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

export default function CitizenDashboard() {
  const { t } = useTranslation();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user from token/localStorage (mocking for simplicity but checking if logged in)
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUser({ name: payload.name || "Citizen", id: payload.id });
        } catch (e) {
            console.error("Failed to parse token");
        }
    }
    const fetchGrievances = async () => {
        try {
            const res = await grievanceService.getAll();
            setComplaints(res.data.data.map(g => ({
                id: g._id,
                category: g.category,
                status: g.status,
                priority: g.priority,
                date: g.createdAt,
                raw: g
            })));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    fetchGrievances();
  }, []);

  const stats = [
    { label: t("Total Complaints"), value: complaints.length, color: "from-blue-500 to-indigo-600", icon: BarChart3, bg: "bg-blue-50 text-blue-600" },
    { label: t("Pending"), value: complaints.filter(c => c.status === 'Pending').length, color: "from-amber-400 to-orange-500", icon: AlertCircle, bg: "bg-amber-50 text-amber-600" },
    { label: t("In Progress"), value: complaints.filter(c => c.status === 'In Progress').length, color: "from-sky-400 to-blue-500", icon: Clock, bg: "bg-sky-50 text-sky-600" },
    { label: t("Resolved"), value: complaints.filter(c => c.status === 'Resolved').length, color: "from-emerald-400 to-green-600", icon: CheckCircle2, bg: "bg-emerald-50 text-emerald-600" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200";
      case "In Progress":
        return "bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200";
      case "Resolved":
        return "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "text-red-600 border-red-200 bg-red-50";
      case "Medium": return "text-amber-600 border-amber-200 bg-amber-50";
      case "Low": return "text-emerald-600 border-emerald-200 bg-emerald-50";
      default: return "";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col shadow-sm relative z-10">
        <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-100">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg shadow-emerald-200 flex items-center justify-center">
            <span className="text-white text-xl">🏛️</span>
          </div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
            {t("app_title")}
          </h1>
        </div>
        
        <div className="py-6 px-4 flex-1">
          <p className="px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">{t("Dashboard Menu")}</p>
          <nav className="space-y-1.5">
            <Button variant="ghost" className="w-full justify-start bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium">
              <LayoutDashboard className="mr-3 h-5 w-5" />
              {t("Overview")}
            </Button>
            <Link to="/citizen/dashboard">
              <Button variant="ghost" className="w-full justify-start text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium">
                <FileText className="mr-3 h-5 w-5" />
                {t("My Complaints")}
              </Button>
            </Link>
          </nav>

          <p className="px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 mt-8">{t("Settings")}</p>
          <nav className="space-y-1.5">
            <Button variant="ghost" className="w-full justify-start text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium">
              <User className="mr-3 h-5 w-5" />
              {t("Profile")}
            </Button>
            <Button variant="ghost" className="w-full justify-start text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium">
              <Settings className="mr-3 h-5 w-5" />
              {t("Preferences")}
            </Button>
            <Button variant="ghost" className="w-full justify-start text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium">
              <HelpCircle className="mr-3 h-5 w-5" />
              {t("Help & Support")}
            </Button>
          </nav>
        </div>
        
        <div className="p-4 border-t border-slate-100">
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 font-medium">
              <LogOut className="mr-3 h-5 w-5" />
              {t("Sign Out")}
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Abstract Backgrounds */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-400/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-3xl -z-10 -translate-x-1/2 pointer-events-none"></div>

        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/50 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{t("Welcome back")}, {user?.name || "Citizen"}! 👋</h2>
            <p className="text-sm text-slate-500 font-medium">{t("Here's what's happening with your grievances today")}.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <LanguageSwitcher className="bg-slate-50 text-slate-700 border-none hover:bg-slate-100" />
            </div>
            
            <div className="relative">
              <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </Button>
            </div>
            
            <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block"></div>
            
            <Button variant="ghost" className="p-1 pr-3 hover:bg-slate-50 rounded-full border border-slate-200 shadow-sm hidden sm:flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 font-bold text-sm">
                {(user?.name || "C").substring(0, 1)}
              </div>
              <span className="text-sm font-semibold text-slate-700">{user?.name || "Citizen"}</span>
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                  <LayoutDashboard size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{t("Quick Overview")}</h3>
                  <p className="text-xs text-slate-500">{t("Live statistics of your submitted complaints")}</p>
                </div>
              </div>
              <Link to="/citizen/raise-grievance">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white shadow-md shadow-emerald-500/20 rounded-xl px-6 font-semibold border-none transition-all hover:scale-[1.02]">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  {t("New Grievance")}
                </Button>
              </Link>
            </div>

            {/* Stats Cards */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="border-none shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden relative group">
                    <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${stat.color}`}></div>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-500 mb-1">{stat.label}</p>
                          <h4 className="text-4xl font-extrabold text-slate-800 tracking-tight">{stat.value}</h4>
                        </div>
                        <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                          <stat.icon className="h-7 w-7" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Table Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Card className="border-slate-200 shadow-sm overflow-hidden">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                    <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold text-slate-800">{t("Recent Complaints")}</CardTitle>
                      <CardDescription className="text-slate-500">{t("Track and manage your submitted grievances")}</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="hidden sm:flex rounded-lg text-slate-600 border-slate-200 hover:bg-slate-50">
                      {t("View All")}
                    </Button>
                  </div>
                </CardHeader>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-slate-50/80">
                      <TableRow className="hover:bg-transparent border-slate-200">
                        <TableHead className="font-semibold text-slate-600">{t("ID & Details")}</TableHead>
                        <TableHead className="font-semibold text-slate-600">{t("Category")}</TableHead>
                        <TableHead className="font-semibold text-slate-600">{t("Status")}</TableHead>
                        <TableHead className="font-semibold text-slate-600">{t("Priority")}</TableHead>
                        <TableHead className="font-semibold text-slate-600">{t("Date Filed")}</TableHead>
                        <TableHead className="text-right font-semibold text-slate-600">{t("Actions")}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                          <TableRow>
                             <TableCell colSpan={6} className="text-center py-8">{t("Loading...")}</TableCell>
                          </TableRow>
                        ) : complaints.length === 0 ? (
                          <TableRow>
                             <TableCell colSpan={6} className="text-center py-8">{t("No complaints found.")}</TableCell>
                          </TableRow>
                        ) : (
                          complaints.map((complaint) => (
                        <TableRow key={complaint.id} className="hover:bg-slate-50/80 transition-colors border-slate-100 group">
                          <TableCell>
                            <div className="font-bold text-slate-700">{complaint.id.substring(0, 8)}...</div>
                            <div className="text-xs text-slate-400 mt-0.5">{t("Location: ")}{(complaint.raw?.location?.address || 'N/A').substring(0,20)}</div>
                          </TableCell>
                          <TableCell>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm font-medium bg-slate-100 text-slate-700 border border-slate-200">
                              {t(complaint.category)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`px-2.5 py-1 text-[13px] border ${getStatusColor(complaint.status)}`}>
                              {t(complaint.status)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`px-2 py-0.5 text-xs font-semibold uppercase tracking-wider ${getPriorityColor(complaint.priority)}`}>
                              {t(complaint.priority)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-600 font-medium">
                            {new Date(complaint.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </TableCell>
                          <TableCell className="text-right">
                            <Link to={`/citizen/track-complaint?id=${complaint.id}`}>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 font-semibold"
                              >
                                {t("View")} 
                                <span className="ml-1 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all">&rarr;</span>
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      )))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </motion.div>
            
          </div>
        </div>
      </main>
    </div>
  );
}
