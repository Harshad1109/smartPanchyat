const fs = require('fs');

const enGrievance = {
  "Grievance Details": "Grievance Details",
  "Contact": "Contact",
  "Deadline": "Deadline",
  "Location": "Location",
  "Uploaded Images": "Uploaded Images",
  "Action History": "Action History",
  "Assigned to Field Officer": "Assigned to Field Officer",
  "Site Inspection Completed": "Site Inspection Completed",
  "Quick Actions": "Quick Actions",
  "Assign to Field Officer": "Assign to Field Officer",
  "Select officer": "Select officer",
  "Update Status": "Update Status",
  "Change status": "Change status",
  "Add Remarks": "Add Remarks",
  "Enter your remarks or updates...": "Enter your remarks or updates...",
  "Update Complaint": "Update Complaint",
  "Mark as Resolved": "Mark as Resolved"
};

const hiGrievance = {
  "Grievance Details": "शिकायत विवरण",
  "Contact": "संपर्क",
  "Deadline": "समय सीमा",
  "Location": "स्थान",
  "Uploaded Images": "अपलोड की गई छवियाँ",
  "Action History": "कार्रवाई का इतिहास",
  "Assigned to Field Officer": "फील्ड अधिकारी को सौंपा गया",
  "Site Inspection Completed": "साइट निरीक्षण पूरा हुआ",
  "Quick Actions": "त्वरित कार्रवाइयां",
  "Assign to Field Officer": "फ़ील्ड अधिकारी को सौंपें",
  "Select officer": "अधिकारी चुनें",
  "Update Status": "स्थिति अपडेट करें",
  "Change status": "स्थिति बदलें",
  "Add Remarks": "टिप्पणियां जोड़ें",
  "Enter your remarks or updates...": "अपनी टिप्पणियां या अपडेट दर्ज करें...",
  "Update Complaint": "शिकायत अपडेट करें",
  "Mark as Resolved": "समाधान के रूप में चिह्नित करें"
};

const mrGrievance = {
  "Grievance Details": "तक्रारीचा तपशील",
  "Contact": "संपर्क",
  "Deadline": "अंतिम मुदत",
  "Location": "स्थान",
  "Uploaded Images": "अपलोड केलेल्या प्रतिमा",
  "Action History": "कृती इतिहास",
  "Assigned to Field Officer": "क्षेत्रीय अधिकाऱ्याकडे सोपवले",
  "Site Inspection Completed": "साइट तपासणी पूर्ण",
  "Quick Actions": "त्वरित कृती",
  "Assign to Field Officer": "फील्ड अधिकाऱ्याला वाटप करा",
  "Select officer": "अधिकारी निवडा",
  "Update Status": "स्थिती अपडेट करा",
  "Change status": "स्थिती बदला",
  "Add Remarks": "टिप्पण्या जोडा",
  "Enter your remarks or updates...": "तुमच्या टिप्पण्या किंवा अद्यतने प्रविष्ट करा...",
  "Update Complaint": "तक्रार अपडेट करा",
  "Mark as Resolved": "निराकरण झाले म्हणून चिन्हांकित करा"
};

const updateJSON = (file, newObj) => {
  const content = JSON.parse(fs.readFileSync(file, 'utf8'));
  const updated = { ...content, ...newObj };
  fs.writeFileSync(file, JSON.stringify(updated, null, 2), 'utf8');
}

updateJSON('./src/locales/en/translation.json', enGrievance);
updateJSON('./src/locales/hi/translation.json', hiGrievance);
updateJSON('./src/locales/mr/translation.json', mrGrievance);
