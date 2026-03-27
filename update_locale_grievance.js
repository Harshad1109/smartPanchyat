const fs = require('fs');

const enGrievance = {
  "Back to Dashboard": "Back to Dashboard",
  "Raise New Grievance": "Raise New Grievance",
  "Submit your complaint with complete details": "Submit your complaint with complete details",
  "Grievance Category *": "Grievance Category *",
  "Select category": "Select category",
  "Road & Infrastructure": "Road & Infrastructure",
  "Water Supply": "Water Supply",
  "Electricity": "Electricity",
  "Sanitation & Cleanliness": "Sanitation & Cleanliness",
  "Drainage": "Drainage",
  "Street Lights": "Street Lights",
  "Public Health": "Public Health",
  "Other": "Other",
  "Subject *": "Subject *",
  "Brief subject of your complaint": "Brief subject of your complaint",
  "Detailed Description *": "Detailed Description *",
  "Describe your complaint in detail...": "Describe your complaint in detail...",
  "Minimum 50 characters": "Minimum 50 characters",
  "Location *": "Location *",
  "Enter location or address": "Enter location or address",
  "Current Location Detected": "Current Location Detected",
  "Upload Photos/Videos (Optional)": "Upload Photos/Videos (Optional)",
  "Click to upload or drag and drop": "Click to upload or drag and drop",
  "PNG, JPG, MP4 up to 10MB (Max 3 files)": "PNG, JPG, MP4 up to 10MB (Max 3 files)",
  "Choose Files": "Choose Files",
  "Contact Mobile *": "Contact Mobile *",
  "Submit Complaint": "Submit Complaint"
};

const hiGrievance = {
  "Back to Dashboard": "डैशबोर्ड पर वापस",
  "Raise New Grievance": "नई शिकायत दर्ज करें",
  "Submit your complaint with complete details": "अपनी शिकायत पूरी जानकारी के साथ जमा करें",
  "Grievance Category *": "शिकायत श्रेणी *",
  "Select category": "श्रेणी चुनें",
  "Road & Infrastructure": "सड़क और बुनियादी ढांचा",
  "Water Supply": "जल आपूर्ति",
  "Electricity": "बिजली",
  "Sanitation & Cleanliness": "स्वच्छता और सफाई",
  "Drainage": "नालियां",
  "Street Lights": "स्ट्रीट लाइट",
  "Public Health": "सार्वजनिक स्वास्थ्य",
  "Other": "अन्य",
  "Subject *": "विषय *",
  "Brief subject of your complaint": "आपकी शिकायत का संक्षिप्त विषय",
  "Detailed Description *": "विस्तृत विवरण *",
  "Describe your complaint in detail...": "अपनी शिकायत का विस्तार से वर्णन करें...",
  "Minimum 50 characters": "न्यूनतम 50 अक्षर",
  "Location *": "स्थान *",
  "Enter location or address": "स्थान या पता दर्ज करें",
  "Current Location Detected": "वर्तमान स्थान का पता चला",
  "Upload Photos/Videos (Optional)": "फ़ोटो / वीडियो अपलोड करें (वैकल्पिक)",
  "Click to upload or drag and drop": "अपलोड करने या खींचने के लिए क्लिक करें",
  "PNG, JPG, MP4 up to 10MB (Max 3 files)": "PNG, JPG, MP4 10MB तक (अधिकतम 3 फाइलें)",
  "Choose Files": "फ़ाइलें चुनें",
  "Contact Mobile *": "संपर्क मोबाइल *",
  "Submit Complaint": "शिकायत दर्ज करें"
};

const mrGrievance = {
  "Back to Dashboard": "डॅशबोर्डवर परत",
  "Raise New Grievance": "नवीन तक्रार नोंदवा",
  "Submit your complaint with complete details": "तुमची तक्रार संपूर्ण तपशीलांसह सबमिट करा",
  "Grievance Category *": "तक्रार श्रेणी *",
  "Select category": "श्रेणी निवडा",
  "Road & Infrastructure": "रस्ते आणि पायाभूत सुविधा",
  "Water Supply": "पाणी पुरवठा",
  "Electricity": "वीज",
  "Sanitation & Cleanliness": "स्वच्छता आणि साफसफाई",
  "Drainage": "गटारे",
  "Street Lights": "पथदिवे",
  "Public Health": "सार्वजनिक आरोग्य",
  "Other": "इतर",
  "Subject *": "विषय *",
  "Brief subject of your complaint": "तुमच्या तक्रारीचा थोडक्यात विषय",
  "Detailed Description *": "तपशीलवार वर्णन *",
  "Describe your complaint in detail...": "तुमच्या तक्रारीचे सविस्तर वर्णन करा...",
  "Minimum 50 characters": "किमान 50 अक्षरे",
  "Location *": "स्थान *",
  "Enter location or address": "स्थान किंवा पत्ता प्रविष्ट करा",
  "Current Location Detected": "वर्तमान स्थान आढळले",
  "Upload Photos/Videos (Optional)": "फोटो / व्हिडिओ अपलोड करा (पर्यायी)",
  "Click to upload or drag and drop": "अपलोड करण्यासाठी किंवा ड्रॅग करण्यासाठी क्लिक करा",
  "PNG, JPG, MP4 up to 10MB (Max 3 files)": "PNG, JPG, MP4 10MB पर्यंत (कमाल 3 फाईल्स)",
  "Choose Files": "फायली निवडा",
  "Contact Mobile *": "संपर्क मोबाईल *",
  "Submit Complaint": "तक्रार सबमिट करा"
};

const updateJSON = (file, newObj) => {
  const content = JSON.parse(fs.readFileSync(file, 'utf8'));
  const updated = { ...content, ...newObj };
  fs.writeFileSync(file, JSON.stringify(updated, null, 2), 'utf8');
}

updateJSON('./src/locales/en/translation.json', enGrievance);
updateJSON('./src/locales/hi/translation.json', hiGrievance);
updateJSON('./src/locales/mr/translation.json', mrGrievance);
