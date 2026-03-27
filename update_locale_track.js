const fs = require('fs');

const enTrack = {
  "Track Your Complaint": "Track Your Complaint",
  "Enter your Grievance ID to track status": "Enter your Grievance ID to track status",
  "Grievance ID": "Grievance ID",
  "Enter Grievance ID (e.g., GRV2026001)": "Enter Grievance ID (e.g., GRV2026001)",
  "Track": "Track",
  "Complaint Details": "Complaint Details",
  "Submitted On": "Submitted On",
  "Expected Resolution": "Expected Resolution",
  "Status Timeline": "Status Timeline",
  "ID:": "ID:",
  "Description": "Description",
  "Complaint Submitted Successfully!": "Complaint Submitted Successfully!",
  "Your grievance has been registered and will be reviewed by the Panchayat office shortly.": "Your grievance has been registered and will be reviewed by the Panchayat office shortly.",
  "Your Grievance ID": "Your Grievance ID",
  "Please save this ID for future reference": "Please save this ID for future reference",
  "Assigned Department:": "Assigned Department:",
  "Expected Resolution:": "Expected Resolution:",
  "Status Updates:": "Status Updates:",
  "Track Complaint": "Track Complaint",
  "Go to Dashboard": "Go to Dashboard"
};

const hiTrack = {
  "Track Your Complaint": "अपनी शिकायत ट्रैक करें",
  "Enter your Grievance ID to track status": "स्थिति ट्रैक करने के लिए अपना शिकायत आईडी दर्ज करें",
  "Grievance ID": "शिकायत आईडी",
  "Enter Grievance ID (e.g., GRV2026001)": "शिकायत आईडी दर्ज करें (उदा. GRV2026001)",
  "Track": "ट्रैक करें",
  "Complaint Details": "शिकायत विवरण",
  "Submitted On": "पर जमा किया गया",
  "Expected Resolution": "अपेक्षित समाधान",
  "Status Timeline": "स्थिति समयरेखा",
  "ID:": "आईडी:",
  "Description": "विवरण",
  "Complaint Submitted Successfully!": "शिकायत सफलतापूर्वक जमा की गई!",
  "Your grievance has been registered and will be reviewed by the Panchayat office shortly.": "आपकी शिकायत दर्ज कर ली गई है और पंचायत कार्यालय द्वारा जल्द ही इसकी समीक्षा की जाएगी।",
  "Your Grievance ID": "आपका शिकायत आईडी",
  "Please save this ID for future reference": "कृपया भविष्य के संदर्भ के लिए यह आईडी सहेजें",
  "Assigned Department:": "आवंटित विभाग:",
  "Expected Resolution:": "अपेक्षित समाधान:",
  "Status Updates:": "स्थिति अपडेट:",
  "Track Complaint": "शिकायत ट्रैक करें",
  "Go to Dashboard": "डैशबोर्ड पर जाएं"
};

const mrTrack = {
  "Track Your Complaint": "तुमची तक्रार ट्रॅक करा",
  "Enter your Grievance ID to track status": "स्थिती ट्रॅक करण्यासाठी तुमचा तक्रार आयडी प्रविष्ट करा",
  "Grievance ID": "तक्रार आयडी",
  "Enter Grievance ID (e.g., GRV2026001)": "तक्रार आयडी प्रविष्ट करा (उदा. GRV2026001)",
  "Track": "ट्रॅक",
  "Complaint Details": "तक्रार तपशील",
  "Submitted On": "रोजी सबमिट केले",
  "Expected Resolution": "अपेक्षित निराकरण",
  "Status Timeline": "स्थिती टाइमलाइन",
  "ID:": "आयडी:",
  "Description": "वर्णन",
  "Complaint Submitted Successfully!": "तक्रार यशस्वीरित्या सबमिट केली!",
  "Your grievance has been registered and will be reviewed by the Panchayat office shortly.": "तुमची तक्रार नोंदवली गेली आहे आणि पंचायत कार्यालयाकडून लवकरच याचे पुनरावलोकन केले जाईल.",
  "Your Grievance ID": "तुमचा तक्रार आयडी",
  "Please save this ID for future reference": "कृपया भविष्यातील संदर्भासाठी हा आयडी जतन करा",
  "Assigned Department:": "नेमून दिलेला विभाग:",
  "Expected Resolution:": "अपेक्षित निराकरण:",
  "Status Updates:": "स्थिती अद्यतने:",
  "Track Complaint": "तक्रार ट्रॅक करा",
  "Go to Dashboard": "डॅशबोर्डवर जा"
};

const updateJSON = (file, newObj) => {
  const content = JSON.parse(fs.readFileSync(file, 'utf8'));
  const updated = { ...content, ...newObj };
  fs.writeFileSync(file, JSON.stringify(updated, null, 2), 'utf8');
}

updateJSON('./src/locales/en/translation.json', enTrack);
updateJSON('./src/locales/hi/translation.json', hiTrack);
updateJSON('./src/locales/mr/translation.json', mrTrack);
