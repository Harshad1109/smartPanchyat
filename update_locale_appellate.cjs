const fs = require('fs');

const enAppellate = {
  "Total Appeals": "Total Appeals",
  "Under Review": "Under Review",
  "Escalated": "Escalated",
  "Closed": "Closed",
  "Appellate Authority Dashboard": "Appellate Authority Dashboard",
  "Higher Authority Review Panel": "Higher Authority Review Panel",
  "Search by Grievance ID or Citizen Name...": "Search by Grievance ID or Citizen Name...",
  "Sort By": "Sort By",
  "Newest First": "Newest First",
  "Oldest First": "Oldest First",
  "By Priority": "By Priority",
  "Apply": "Apply",
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

const hiAppellate = {
  "Total Appeals": "कुल अपील",
  "Under Review": "समीक्षा के तहत",
  "Escalated": "बढ़ाया गया",
  "Closed": "बंद",
  "Appellate Authority Dashboard": "अपीलीय प्राधिकारी डैशबोर्ड",
  "Higher Authority Review Panel": "उच्च प्राधिकारी समीक्षा पैनल",
  "Search by Grievance ID or Citizen Name...": "शिकायत आईडी या नागरिक के नाम से खोजें...",
  "Sort By": "क्रमबद्ध करें",
  "Newest First": "सबसे नया पहले",
  "Oldest First": "सबसे पुराना पहले",
  "By Priority": "प्राथमिकता के अनुसार",
  "Apply": "लागू करें",
  "Escalated Grievances for Review": "समीक्षा के लिए बढ़ाई गई शिकायतें",
  "Cases marked as \"Not Satisfied\" by citizens requiring higher authority review": "नागरिकों द्वारा \"संतुष्ट नहीं\" के रूप में चिह्नित मामले जिन्हें उच्च प्राधिकारी की समीक्षा की आवश्यकता है",
  "Escalation Date": "बढ़ाने की तिथि",
  "Previous Resolution": "पिछला समाधान",
  "Review Case": "मामले की समीक्षा करें",
  "Appellate Review Guidelines": "अपीलीय समीक्षा दिशानिर्देश",
  "Review citizen feedback and previous action history thoroughly": "नागरिक की प्रतिक्रिया और पिछली कार्रवाई के इतिहास की पूरी तरह से समीक्षा करें",
  "Conduct independent assessment if required": "यदि आवश्यक हो तो स्वतंत्र मूल्यांकन करें",
  "Authority to overrule previous decisions and order re-work": "पिछले निर्णयों को रद्द करने और फिर से काम करने का आदेश देने का अधिकार",
  "Final decision is binding on all parties": "अंतिम निर्णय सभी पक्षों के लिए बाध्यकारी है",
  "Target: Complete review within 7 working days": "लक्ष्य: 7 कार्य दिवसों के भीतर समीक्षा पूरी करें"
};

const mrAppellate = {
  "Total Appeals": "एकूण अपील",
  "Under Review": "पुनरावलोकनाखाली",
  "Escalated": "वाढवले",
  "Closed": "बंद",
  "Appellate Authority Dashboard": "अपीलीय प्राधिकरण डॅशबोर्ड",
  "Higher Authority Review Panel": "उच्च प्राधिकरण पुनरावलोकन पॅनेल",
  "Search by Grievance ID or Citizen Name...": "तक्रार आयडी किंवा नागरिकाच्या नावाने शोधा...",
  "Sort By": "क्रमानुसार लावा",
  "Newest First": "सर्वात नवीन प्रथम",
  "Oldest First": "सर्वात जुने प्रथम",
  "By Priority": "प्राधान्यानुसार",
  "Apply": "लागू करा",
  "Escalated Grievances for Review": "पुनरावलोकनासाठी वाढवलेल्या तक्रारी",
  "Cases marked as \"Not Satisfied\" by citizens requiring higher authority review": "नागरिकांनी \"समाधानी नाही\" म्हणून चिन्हांकित केलेली प्रकरणे ज्यांना उच्च प्राधिकरणाच्या पुनरावलोकनाची आवश्यकता आहे",
  "Escalation Date": "वाढवण्याची तारीख",
  "Previous Resolution": "मागील निराकरण",
  "Review Case": "प्रकरणाचे पुनरावलोकन करा",
  "Appellate Review Guidelines": "अपीलीय पुनरावलोकन मार्गदर्शक तत्त्वे",
  "Review citizen feedback and previous action history thoroughly": "नागरिकांच्या अभिप्रायाचे आणि मागील क्रियेच्या इतिहासाचे पूर्णपणे पुनरावलोकन करा",
  "Conduct independent assessment if required": "आवश्यक असल्यास स्वतंत्र मूल्यांकन करा",
  "Authority to overrule previous decisions and order re-work": "मागील निर्णय रद्द करण्याचे आणि पुन्हा काम करण्याचे आदेश देण्याचा अधिकार",
  "Final decision is binding on all parties": "अंतिम निर्णय सर्व पक्षांवर बंधनकारक आहे",
  "Target: Complete review within 7 working days": "लक्ष्य: 7 कामकाजाच्या दिवसांत पुनरावलोकन पूर्ण करा"
};

const updateJSON = (file, newObj) => {
  const content = JSON.parse(fs.readFileSync(file, 'utf8'));
  const updated = { ...content, ...newObj };
  fs.writeFileSync(file, JSON.stringify(updated, null, 2), 'utf8');
}

updateJSON('./src/locales/en/translation.json', enAppellate);
updateJSON('./src/locales/hi/translation.json', hiAppellate);
updateJSON('./src/locales/mr/translation.json', mrAppellate);
