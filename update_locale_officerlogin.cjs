const fs = require('fs');

const enOfficerLogin = {
  "Panchayat Officer Login": "Panchayat Officer Login",
  "Secure access for government officials": "Secure access for government officials",
  "Official ID / Email": "Official ID / Email",
  "Enter official ID or email": "Enter official ID or email",
  "Enter secure password": "Enter secure password",
  "Keep me signed in": "Keep me signed in",
  "Secure Login": "Secure Login",
  "Other portals": "Other portals",
  "Citizen Portal": "Citizen Portal",
  "Appellate Authority": "Appellate Authority"
};

const hiOfficerLogin = {
  "Panchayat Officer Login": "पंचायत अधिकारी लॉगिन",
  "Secure access for government officials": "सरकारी अधिकारियों के लिए सुरक्षित पहुंच",
  "Official ID / Email": "आधिकारिक आईडी / ईमेल",
  "Enter official ID or email": "आधिकारिक आईडी या ईमेल दर्ज करें",
  "Enter secure password": "सुरक्षित पासवर्ड दर्ज करें",
  "Keep me signed in": "मुझे साइन इन रखें",
  "Secure Login": "सुरक्षित लॉगिन",
  "Other portals": "अन्य पोर्टल",
  "Citizen Portal": "नागरिक पोर्टल",
  "Appellate Authority": "अपीलीय प्राधिकारी"
};

const mrOfficerLogin = {
  "Panchayat Officer Login": "पंचायत अधिकारी लॉगिन",
  "Secure access for government officials": "सरकारी अधिकार्यांसाठी सुरक्षित प्रवेश",
  "Official ID / Email": "अधिकृत आयडी / ईमेल",
  "Enter official ID or email": "अधिकृत आयडी किंवा ईमेल प्रविष्ट करा",
  "Enter secure password": "सुरक्षित पासवर्ड प्रविष्ट करा",
  "Keep me signed in": "मला साइन इन ठेवा",
  "Secure Login": "सुरक्षित लॉगिन",
  "Other portals": "इतर पोर्टल",
  "Citizen Portal": "नागरिक पोर्टल",
  "Appellate Authority": "अपीलीय प्राधिकरण"
};

const updateJSON = (file, newObj) => {
  const content = JSON.parse(fs.readFileSync(file, 'utf8'));
  const updated = { ...content, ...newObj };
  fs.writeFileSync(file, JSON.stringify(updated, null, 2), 'utf8');
}

updateJSON('./src/locales/en/translation.json', enOfficerLogin);
updateJSON('./src/locales/hi/translation.json', hiOfficerLogin);
updateJSON('./src/locales/mr/translation.json', mrOfficerLogin);
