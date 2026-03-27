const fs = require('fs');

const enReg = {
  "Create your Smart Panchayat account": "Create your Smart Panchayat account",
  "Enter 10-digit mobile number": "Enter 10-digit mobile number",
  "You will receive OTP on this number": "You will receive OTP on this number",
  "Email Address (Optional)": "Email Address (Optional)",
  "Enter email address": "Enter email address",
  "Village/Panchayat": "Village/Panchayat",
  "Select your village/panchayat": "Select your village/panchayat",
  "Village Panchayat 1": "Village Panchayat 1",
  "Village Panchayat 2": "Village Panchayat 2",
  "Village Panchayat 3": "Village Panchayat 3",
  "Village Panchayat 4": "Village Panchayat 4",
  "Create password": "Create password",
  "Minimum 6 characters": "Minimum 6 characters",
  "Re-enter password": "Re-enter password",
  "Terms and Conditions": "Terms and Conditions",
  "and": "and",
  "Privacy Policy": "Privacy Policy",
  "Login Now": "Login Now"
};

const hiReg = {
  "Create your Smart Panchayat account": "अपना स्मार्ट पंचायत खाता बनाएं",
  "Enter 10-digit mobile number": "10 अंकों का मोबाइल नंबर दर्ज करें",
  "You will receive OTP on this number": "आपको इस नंबर पर ओटीपी प्राप्त होगा",
  "Email Address (Optional)": "ईमेल पता (वैकल्पिक)",
  "Enter email address": "ईमेल पता दर्ज करें",
  "Village/Panchayat": "गाँव/पंचायत",
  "Select your village/panchayat": "अपना गाँव/पंचायत चुनें",
  "Village Panchayat 1": "ग्राम पंचायत 1",
  "Village Panchayat 2": "ग्राम पंचायत 2",
  "Village Panchayat 3": "ग्राम पंचायत 3",
  "Village Panchayat 4": "ग्राम पंचायत 4",
  "Create password": "पासवर्ड बनाएं",
  "Minimum 6 characters": "न्यूनतम 6 अक्षर",
  "Re-enter password": "पासवर्ड फिर से दर्ज करें",
  "Terms and Conditions": "नियम और शर्तें",
  "and": "और",
  "Privacy Policy": "गोपनीयता नीति",
  "Login Now": "अभी लॉगिन करें"
};

const mrReg = {
  "Create your Smart Panchayat account": "तुमचे स्मार्ट पंचायत खाते तयार करा",
  "Enter 10-digit mobile number": "10 अंकी मोबाईल क्रमांक प्रविष्ट करा",
  "You will receive OTP on this number": "तुम्हाला या क्रमांकावर OTP प्राप्त होईल",
  "Email Address (Optional)": "ईमेल पत्ता (पर्यायी)",
  "Enter email address": "ईमेल पत्ता प्रविष्ट करा",
  "Village/Panchayat": "गाव/पंचायत",
  "Select your village/panchayat": "तुमचे गाव/पंचायत निवडा",
  "Village Panchayat 1": "ग्रामपंचायत 1",
  "Village Panchayat 2": "ग्रामपंचायत 2",
  "Village Panchayat 3": "ग्रामपंचायत 3",
  "Village Panchayat 4": "ग्रामपंचायत 4",
  "Create password": "पासवर्ड तयार करा",
  "Minimum 6 characters": "किमान 6 अक्षरे",
  "Re-enter password": "पासवर्ड पुन्हा प्रविष्ट करा",
  "Terms and Conditions": "अटी आणि शर्ती",
  "and": "आणि",
  "Privacy Policy": "गोपनीयता धोरण",
  "Login Now": "आता लॉगिन करा"
};

const updateJSON = (file, newObj) => {
  const content = JSON.parse(fs.readFileSync(file, 'utf8'));
  const updated = { ...content, ...newObj };
  fs.writeFileSync(file, JSON.stringify(updated, null, 2), 'utf8');
}

updateJSON('./src/locales/en/translation.json', enReg);
updateJSON('./src/locales/hi/translation.json', hiReg);
updateJSON('./src/locales/mr/translation.json', mrReg);
