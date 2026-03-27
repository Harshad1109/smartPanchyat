const fs = require('fs');
const path = require('path');

const en = {
  // Sidebar & Navigation
  "Overview": "Overview",
  "My Complaints": "My Complaints",
  "Profile": "Profile",
  "Preferences": "Preferences",
  "Help & Support": "Help & Support",
  "Dashboard Menu": "Dashboard Menu",
  "Welcome back": "Welcome back",
  "Here's what's happening with your grievances today": "Here's what's happening with your grievances today",
  "Quick Overview": "Quick Overview",
  "Live statistics of your submitted complaints": "Live statistics of your submitted complaints",
  "Recent Complaints": "Recent Complaints",
  "Track and manage your submitted grievances": "Track and manage your submitted grievances",
  "View All": "View All",
  "View": "View",
  "ID & Details": "ID & Details",
  "Category": "Category",
  "Status": "Status",
  "Priority": "Priority",
  "Date Filed": "Date Filed",
  "Actions": "Actions",
  "Grievance ID": "Grievance ID",
  "Citizen Name": "Citizen Name",
  "Deadline": "Deadline",

  // Officer Dashboard
  "Panchayat Officer Dashboard": "Panchayat Officer Dashboard",
  "Officer: Suresh Patil | Panchayat Office 1": "Officer: Suresh Patil | Panchayat Office 1",
  "Total Complaints": "Total Complaints",
  "Pending": "Pending",
  "In Progress": "In Progress",
  "Overdue": "Overdue",
  "Assigned Complaints": "Assigned Complaints",

  // Status & Actions
  "Yes": "Yes",
  "No": "No",
  "Not Satisfied": "Not Satisfied",
  "Under Review": "Under Review",
  "Escalated": "Escalated",
  "Closed": "Closed",

  // Appellate
  "Escalated Grievances for Review": "Escalated Grievances for Review",
  "Cases marked as \"Not Satisfied\" by citizens requiring higher authority review": "Cases marked as \"Not Satisfied\" by citizens requiring higher authority review",
  "Escalation Date": "Escalation Date",
  "Previous Resolution": "Previous Resolution",
  "Review Case": "Review Case",
  "Appellate Review Guidelines": "Appellate Review Guidelines",
  "Review citizen feedback and previous action history thoroughly": "Review citizen feedback and previous action history thoroughly",
  "Conduct independent assessment if required": "Conduct independent assessment if required",
  "Authority to overrule previous decisions and order re-work": "Authority to overrule previous decisions and order re-work",
  "Final decision is binding on all parties": "Final decision is binding on all parties",
  "Target: Complete review within 7 working days": "Target: Complete review within 7 working days"
};

const hi = {
  // Sidebar & Navigation
  "Overview": "अवलोकन",
  "My Complaints": "मेरी शिकायतें",
  "Profile": "प्रोफ़ाइल",
  "Preferences": "वरीयताएँ",
  "Help & Support": "सहायता और समर्थन",
  "Dashboard Menu": "डैशबोर्ड मेनू",
  "Welcome back": "स्वागत है",
  "Here's what's happening with your grievances today": "आज आपकी शिकायतों की स्थिति यहाँ दी गई है",
  "Quick Overview": "त्वरित अवलोकन",
  "Live statistics of your submitted complaints": "आपकी प्रस्तुत शिकायतों के लाइव आँकड़े",
  "Recent Complaints": "हाल की शिकायतें",
  "Track and manage your submitted grievances": "अपनी प्रस्तुत शिकायतों को ट्रैक और प्रबंधित करें",
  "View All": "सभी देखें",
  "View": "देखें",
  "ID & Details": "आईडी और विवरण",
  "Category": "श्रेणी",
  "Status": "स्थिति",
  "Priority": "प्राथमिकता",
  "Date Filed": "दायर करने की तिथि",
  "Actions": "कार्रवाई",
  "Grievance ID": "शिकायत आईडी",
  "Citizen Name": "नागरिक का नाम",
  "Deadline": "समय सीमा",

  // Officer Dashboard
  "Panchayat Officer Dashboard": "पंचायत अधिकारी डैशबोर्ड",
  "Officer: Suresh Patil | Panchayat Office 1": "अधिकारी: सुरेश पाटिल | पंचायत कार्यालय 1",
  "Total Complaints": "कुल शिकायतें",
  "Pending": "लंबित",
  "In Progress": "प्रगति पर",
  "Overdue": "समय सीमा समाप्त",
  "Assigned Complaints": "सौंपी गई शिकायतें",

  // Status & Actions
  "Yes": "हाँ",
  "No": "नहीं",
  "Not Satisfied": "संतुष्ट नहीं",
  "Under Review": "समीक्षाधीन",
  "Escalated": "भेजा गया",
  "Closed": "बंद",

  // Appellate
  "Escalated Grievances for Review": "समीक्षा के लिए भेजी गई शिकायतें",
  "Cases marked as \"Not Satisfied\" by citizens requiring higher authority review": "नागरिकों द्वारा \"संतुष्ट नहीं\" के रूप में चिह्नित मामले जिन्हें उच्च अधिकारी समीक्षा की आवश्यकता है",
  "Escalation Date": "भेजने की तिथि",
  "Previous Resolution": "पिछला समाधान",
  "Review Case": "मामले की समीक्षा करें",
  "Appellate Review Guidelines": "अपीलीय समीक्षा दिशानिर्देश",
  "Review citizen feedback and previous action history thoroughly": "नागरिक प्रतिक्रिया और पिछले कार्रवाई इतिहास की गहन समीक्षा करें",
  "Conduct independent assessment if required": "यदि आवश्यक हो तो स्वतंत्र मूल्यांकन करें",
  "Authority to overrule previous decisions and order re-work": "पिछले निर्णयों को बदलने और फिर से काम करने का आदेश देने का अधिकार",
  "Final decision is binding on all parties": "अंतिम निर्णय सभी पक्षों पर बाध्यकारी है",
  "Target: Complete review within 7 working days": "लक्ष्य: 7 कार्य दिवसों के भीतर समीक्षा पूरी करें"
};

const mr = {
  // Sidebar & Navigation
  "Overview": "आढावा",
  "My Complaints": "माझ्या तक्रारी",
  "Profile": "प्रोफाइल",
  "Preferences": "पसंती",
  "Help & Support": "मदत आणि समर्थन",
  "Dashboard Menu": "डॅशबोर्ड मेनू",
  "Welcome back": "स्वागत आहे",
  "Here's what's happening with your grievances today": "तुमच्या तक्रारींची आजची स्थिती येथे आहे",
  "Quick Overview": "त्वरीत आढावा",
  "Live statistics of your submitted complaints": "तुमच्या सादर केलेल्या तक्रारींची ताजी आकडेवारी",
  "Recent Complaints": "अलिकडील तक्रारी",
  "Track and manage your submitted grievances": "तुमच्या सादर केलेल्या तक्रारींचा मागोवा घ्या आणि व्यवस्थापन करा",
  "View All": "सर्व पहा",
  "View": "पहा",
  "ID & Details": "आयडी आणि तपशील",
  "Category": "श्रेणी",
  "Status": "स्थिती",
  "Priority": "प्राधान्य",
  "Date Filed": "दाखल तारीख",
  "Actions": "कृती",
  "Grievance ID": "तक्रार आयडी",
  "Citizen Name": "नागरिकाचे नाव",
  "Deadline": "मुदत",

  // Officer Dashboard
  "Panchayat Officer Dashboard": "पंचायत अधिकारी डॅशबोर्ड",
  "Officer: Suresh Patil | Panchayat Office 1": "अधिकारी: सुरेश पाटील | पंचायत कार्यालय १",
  "Total Complaints": "एकूण तक्रारी",
  "Pending": "प्रलंबित",
  "In Progress": "प्रगतीपथावर",
  "Overdue": "मुदत संपली",
  "Assigned Complaints": "नियुक्त तक्रारी",

  // Status & Actions
  "Yes": "हो",
  "No": "नाही",
  "Not Satisfied": "समाधानी नाही",
  "Under Review": "पुनरावलोकनाधीन",
  "Escalated": "वाढवण्यात आले",
  "Closed": "बंद",

  // Appellate
  "Escalated Grievances for Review": "पुनरावलोकनासाठी पाठवलेल्या तक्रारी",
  "Cases marked as \"Not Satisfied\" by citizens requiring higher authority review": "नागरिकांनी \"समाधानी नाही\" म्हणून चिन्हांकित केलेली प्रकरणे ज्यांना उच्च प्राधिकरणाच्या पुनरावलोकनाची आवश्यकता आहे",
  "Escalation Date": "वाढवल्याची तारीख",
  "Previous Resolution": "मागील निकाल",
  "Review Case": "प्रकरणाचे पुनरावलोकन करा",
  "Appellate Review Guidelines": "अपीलीय पुनरावलोकन मार्गदर्शक तत्त्वे",
  "Review citizen feedback and previous action history thoroughly": "नागरिकांचा प्रतिसाद आणि मागील कृती इतिहासाचे सखोल पुनरावलोकन करा",
  "Conduct independent assessment if required": "आवश्यक असल्यास स्वतंत्र मूल्यांकन करा",
  "Authority to overrule previous decisions and order re-work": "मागील निर्णय रद्द करण्याचा आणि पुन्हा कामाचे आदेश देण्याचा अधिकार",
  "Final decision is binding on all parties": "अंतिम निर्णय सर्व पक्षांवर बंधनकारक आहे",
  "Target: Complete review within 7 working days": "लक्ष्य: ७ कामकाजाच्या दिवसांत पुनरावलोकन पूर्ण करा"
};

const updateFile = (lang, data) => {
  const filePath = path.join('src', 'locales', lang, 'translation.json');
  const existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const newData = { ...existingData, ...data };
  fs.writeFileSync(filePath, JSON.stringify(newData, null, 2), 'utf8');
  console.log(`Updated ${filePath}`);
};

updateFile('en', en);
updateFile('hi', hi);
updateFile('mr', mr);
