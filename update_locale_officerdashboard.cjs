const fs = require('fs');

const enOfficerDashboard = {
  "Overdue": "Overdue",
  "Panchayat Officer Dashboard": "Panchayat Officer Dashboard",
  "Officer: Suresh Patil | Panchayat Office 1": "Officer: Suresh Patil | Panchayat Office 1",
  "Filter by Category": "Filter by Category",
  "All Categories": "All Categories",
  "Road": "Road",
  "Sanitation": "Sanitation",
  "Filter by Status": "Filter by Status",
  "All Status": "All Status",
  "Filter by Priority": "Filter by Priority",
  "All Priorities": "All Priorities",
  "Apply Filters": "Apply Filters",
  "Assigned Complaints": "Assigned Complaints",
  "Citizen Name": "Citizen Name",
  "Deadline": "Deadline",
  "View Details": "View Details"
};

const hiOfficerDashboard = {
  "Overdue": "समय सीमा समाप्त",
  "Panchayat Officer Dashboard": "पंचायत अधिकारी डैशबोर्ड",
  "Officer: Suresh Patil | Panchayat Office 1": "अधिकारी: सुरेश पाटिल | पंचायत कार्यालय 1",
  "Filter by Category": "श्रेणी के अनुसार फ़िल्टर करें",
  "All Categories": "सभी श्रेणियां",
  "Road": "सड़क",
  "Sanitation": "स्वच्छता",
  "Filter by Status": "स्थिति के अनुसार फ़िल्टर करें",
  "All Status": "सभी स्थितियां",
  "Filter by Priority": "प्राथमिकता के अनुसार फ़िल्टर करें",
  "All Priorities": "सभी प्राथमिकताएं",
  "Apply Filters": "फ़िल्टर लागू करें",
  "Assigned Complaints": "सौंपी गई शिकायतें",
  "Citizen Name": "नागरिक का नाम",
  "Deadline": "समय सीमा",
  "View Details": "विवरण देखें"
};

const mrOfficerDashboard = {
  "Overdue": "मुदत संपलेली",
  "Panchayat Officer Dashboard": "पंचायत अधिकारी डॅशबोर्ड",
  "Officer: Suresh Patil | Panchayat Office 1": "अधिकारी: सुरेश पाटील | पंचायत कार्यालय 1",
  "Filter by Category": "श्रेणीनुसार फिल्टर करा",
  "All Categories": "सर्व श्रेण्या",
  "Road": "रस्ता",
  "Sanitation": "स्वच्छता",
  "Filter by Status": "स्थितीनुसार फिल्टर करा",
  "All Status": "सर्व स्थिती",
  "Filter by Priority": "प्राधान्यानुसार फिल्टर करा",
  "All Priorities": "सर्व प्राधान्ये",
  "Apply Filters": "फिल्टर लागू करा",
  "Assigned Complaints": "नेमून दिलेल्या तक्रारी",
  "Citizen Name": "नागरिकाचे नाव",
  "Deadline": "अंतिम मुदत",
  "View Details": "तपशील पहा"
};

const updateJSON = (file, newObj) => {
  const content = JSON.parse(fs.readFileSync(file, 'utf8'));
  const updated = { ...content, ...newObj };
  fs.writeFileSync(file, JSON.stringify(updated, null, 2), 'utf8');
}

updateJSON('./src/locales/en/translation.json', enOfficerDashboard);
updateJSON('./src/locales/hi/translation.json', hiOfficerDashboard);
updateJSON('./src/locales/mr/translation.json', mrOfficerDashboard);
