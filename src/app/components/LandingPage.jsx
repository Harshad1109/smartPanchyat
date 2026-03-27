import { Link } from "react-router-dom";
import {
  FileText,
  Search,
  CheckCircle,
  MapPin,
  Camera,
  Bell,
  BarChart2,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { motion } from "motion/react";
import heroImage from "../../assets/panchayat_hero.png";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

export default function LandingPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-neutral-50 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Navbar with Glassmorphism */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 outline-none w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-700 rounded-xl shadow-lg flex items-center justify-center transform hover:scale-105 transition-transform cursor-pointer">
                <span className="text-white text-2xl">🏛️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-green-500 bg-clip-text text-transparent">
                  {t("app_title")}
                </h1>
                <p className="text-xs font-semibold text-emerald-600/80 uppercase tracking-widest mt-0.5">
                  {t("app_subtitle")}
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <LanguageSwitcher />
              <Link to="/citizen/login">
                <Button
                  variant="ghost"
                  className="text-emerald-700 hover:text-emerald-800 hover:bg-emerald-100 font-semibold px-6 py-2 rounded-full border border-transparent hover:border-emerald-200 transition-all"
                >
                  {t("sign_in")}
                </Button>
              </Link>
              <Link to="/citizen/register">
                <Button className="bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white shadow-xl shadow-emerald-500/30 rounded-full px-8 py-2 font-semibold border-none transition-all hover:-translate-y-0.5">
                  {t("get_started")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex flex-col justify-center">
        {/* Abstract background blobs */}
        <div className="absolute top-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-pulse"></div>
          <div className="absolute top-[20%] left-[-10%] w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>
          <div className="absolute bottom-[10%] right-[30%] w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-40" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl px-2"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-sm text-emerald-800 text-sm font-semibold mb-8 shadow-sm border border-emerald-200 hover:shadow-md transition-shadow cursor-default">
                <span className="flex h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></span>
                {t("hero_badge")}
              </div>
              <h2 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-[1.15] mb-8 tracking-tight">
                {t("hero_title_1")} <br/>
                <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent inline-block pb-2">
                  {t("hero_title_2")}
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-lg font-medium">
                {t("hero_desc")}
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <Link to="/citizen/raise-grievance">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white px-10 py-7 text-lg rounded-full shadow-2xl shadow-emerald-500/30 group border-none"
                  >
                    <FileText className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                    {t("raise_complaint")}
                    <ChevronRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform opacity-70" />
                  </Button>
                </Link>
                <Link to="/citizen/track-complaint">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-10 py-7 text-lg rounded-full shadow-sm hover:border-emerald-300 bg-white/50 backdrop-blur-sm border-dashed"
                  >
                    <Search className="mr-3 h-6 w-6 text-emerald-600" />
                    {t("track_status")}
                  </Button>
                </Link>
              </div>
              
              <div className="mt-14 flex items-center gap-10 text-sm font-semibold text-gray-500 bg-white/50 inline-flex p-4 rounded-2xl border border-gray-100 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  </div>
                  <span>{t("secure_verified")}</span>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <span>{t("resolution_rate")}</span>
                </div>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400 to-teal-300 blur-3xl opacity-30 rounded-full scale-110"></div>
              
              <div className="relative z-10 p-2 bg-white/40 backdrop-blur-2xl rounded-3xl border border-white shadow-2xl transform hover:-translate-y-2 transition-transform duration-500">
                <img 
                  src={heroImage} 
                  alt="Smart Panchayat Illustration" 
                  className="w-full h-auto rounded-[20px] shadow-inner"
                />
                
                {/* Floating Notification */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -bottom-6 -left-10 bg-white p-5 rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-emerald-600 font-bold tracking-wider uppercase mb-0.5">Resolved</p>
                    <p className="text-sm font-bold text-gray-900">Road Repair #1402</p>
                  </div>
                </motion.div>
                
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h3 className="text-emerald-600 font-bold tracking-widest uppercase text-sm mb-3">{t("how_it_works")}</h3>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              {t("simple_3_step")}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10 relative">
            <div className="hidden md:block absolute top-[45%] left-10 w-[calc(100%-5rem)] h-1 bg-gradient-to-r from-emerald-100 via-emerald-400 to-emerald-100 -translate-y-1/2 z-0 rounded-full"></div>
            
            {[
              { icon: FileText, title: t("step1_title"), desc: t("step1_desc") },
              { icon: Bell, title: t("step2_title"), desc: t("step2_desc") },
              { icon: CheckCircle, title: t("step3_title"), desc: t("step3_desc") }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -15, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative z-10"
              >
                <Card className="border-none shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] bg-white/90 backdrop-blur-xl hover:shadow-[0_20px_60px_rgba(16,_185,_129,_0.15)] transition-all duration-300 rounded-3xl h-full flex flex-col">
                  <CardContent className="p-10 text-center flex flex-col items-center flex-grow">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-[2rem] flex items-center justify-center mb-8 shadow-inner border border-emerald-50 group rotate-3 hover:rotate-0 transition-transform">
                      <step.icon className="h-12 w-12 text-emerald-600 group-hover:scale-110 group-hover:text-emerald-500 transition-all drop-shadow-sm" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h4>
                    <p className="text-gray-500 leading-relaxed font-medium">{step.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-32 bg-gray-900 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-900/40 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-900/30 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white tracking-tight">
              {t("features_title_1")} <br/><span className="text-emerald-400 inline-block mt-2">{t("features_title_2")}</span>
            </h2>
            <p className="text-gray-400 text-lg">{t("features_desc")}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: MapPin, title: t("feat1_title"), desc: t("feat1_desc") },
              { icon: Camera, title: t("feat2_title"), desc: t("feat2_desc") },
              { icon: Bell, title: t("feat3_title"), desc: t("feat3_desc") },
              { icon: BarChart2, title: t("feat4_title"), desc: t("feat4_desc") }
            ].map((feat, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.08)" }}
                className="bg-white/5 border border-white/10 p-8 rounded-3xl transition-all cursor-default relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500 transform -translate-x-full group-hover:translate-x-0 transition-transform"></div>
                <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors border border-white/5">
                  <feat.icon className="h-8 w-8 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-white tracking-wide">{feat.title}</h4>
                <p className="text-gray-400 leading-relaxed font-medium">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8">{t("cta_title")}</h2>
          <p className="text-emerald-100 text-xl mb-10 max-w-2xl mx-auto">{t("cta_desc")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link to="/citizen/register">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-emerald-700 w-full sm:w-auto px-10 py-7 text-lg rounded-full font-bold shadow-2xl">
                  {t("register_citizen")}
                </Button>
              </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
            <div className="col-span-1 md:col-span-5 pr-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-700 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-white text-lg">🏛️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{t("app_title")}</h3>
              </div>
              <p className="text-gray-500 text-base leading-relaxed mb-8">
                {t("footer_desc")}
              </p>
              <div className="flex gap-4">
                 {/* Social links placeholders */}
                 {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gray-100 hover:bg-emerald-100 hover:text-emerald-600 text-gray-400 flex items-center justify-center transition-colors cursor-pointer">
                      <div className="w-4 h-4 bg-current rounded-[3px]"></div>
                    </div>
                 ))}
              </div>
            </div>
            
            <div className="col-span-1 md:col-span-3">
              <h4 className="font-bold text-gray-900 mb-6 text-lg tracking-wide uppercase">{t("quick_links")}</h4>
              <ul className="space-y-4 text-base font-medium text-gray-500">
                <li><a href="#" className="hover:text-emerald-600 hover:pl-2 transition-all block">{t("about_initiative")}</a></li>
                <li><a href="#" className="hover:text-emerald-600 hover:pl-2 transition-all block">{t("citizen_charter")}</a></li>
                <li><a href="#" className="hover:text-emerald-600 hover:pl-2 transition-all block">{t("view_public_dashboard")}</a></li>
                <li><a href="#" className="hover:text-emerald-600 hover:pl-2 transition-all block">{t("help_faq")}</a></li>
              </ul>
            </div>
            
            <div className="col-span-1 md:col-span-4">
              <h4 className="font-bold text-gray-900 mb-6 text-lg tracking-wide uppercase">{t("contact_us")}</h4>
              <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100">
                <ul className="space-y-5 text-base font-medium text-gray-600">
                  <li className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-emerald-500 mt-0.5" /> 
                    <span dangerouslySetInnerHTML={{ __html: t("address") }}></span>
                  </li>
                  <li className="flex items-center gap-4">
                    <Search className="h-6 w-6 text-emerald-500" /> 
                    <span>1800-111-2222 <br/><span className="text-sm font-normal text-gray-400">{t("toll_free")}</span></span>
                  </li>
                  <li className="flex items-center gap-4">
                    <FileText className="h-6 w-6 text-emerald-500" /> 
                    <span className="text-emerald-600 hover:underline cursor-pointer">support@panchayat.gov.in</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500 font-medium">
            <p>{t("copy_right")}</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-emerald-600 transition-colors">{t("privacy_policy")}</a>
              <a href="#" className="hover:text-emerald-600 transition-colors">{t("terms_of_service")}</a>
              <a href="#" className="hover:text-emerald-600 transition-colors">{t("accessibility")}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
