const fs = require('fs');

const enNew = {
  "features_title_1": "Smart Features for",
  "features_title_2": "Transparent Governance",
  "features_desc": "Everything you need to report and track community issues effectively.",
  "feat1_title": "GPS Tagging",
  "feat1_desc": "Automatic location mapping for accurate assignments.",
  "feat2_title": "Media Upload",
  "feat2_desc": "Attach photos & video evidence in high quality.",
  "feat3_title": "Smart Alerts",
  "feat3_desc": "Real-time updates straight to your mobile.",
  "feat4_title": "Open Data",
  "feat4_desc": "Public dashboard tracking resolution rates.",
  "cta_title": "Ready to Improve Your Panchayat?",
  "cta_desc": "Join thousands of citizens actively participating in transparent local governance. Registration takes less than a minute.",
  "register_citizen": "Register as Citizen",
  "footer_desc": "A digital initiative empowering citizens to connect, report, and improve their local governance efficiently and transparently. Let's build a better community together.",
  "quick_links": "Quick Links",
  "about_initiative": "About Initiative",
  "citizen_charter": "Citizen Charter",
  "view_public_dashboard": "View Public Dashboard",
  "help_faq": "Help & FAQ",
  "contact_us": "Contact Us",
  "address": "Central Panchayat Bhavan,<br/>New Delhi, India 110001",
  "toll_free": "Toll Free, 8AM to 8PM",
  "copy_right": "© 2026 Smart Panchayat E-Governance System. All rights reserved.",
  "privacy_policy": "Privacy Policy",
  "terms_of_service": "Terms of Service",
  "accessibility": "Accessibility"
};

const hiNew = {
  "features_title_1": "पारदर्शी शासन के लिए",
  "features_title_2": "स्मार्ट विशेषताएं",
  "features_desc": "सामुदायिक समस्याओं की रिपोर्ट और प्रभावी ढंग से ट्रैकिंग के लिए आपको जो कुछ भी चाहिए।",
  "feat1_title": "जीपीएस टैगिंग",
  "feat1_desc": "सटीक असाइनमेंट के लिए स्वचालित स्थान मानचित्रण।",
  "feat2_title": "मीडिया अपलोड",
  "feat2_desc": "उच्च गुणवत्ता में फ़ोटो और वीडियो साक्ष्य संलग्न करें।",
  "feat3_title": "स्मार्ट अलर्ट",
  "feat3_desc": "सीधे आपके मोबाइल पर रीयल-टाइम अपडेट।",
  "feat4_title": "ओपन डेटा",
  "feat4_desc": "सार्वजनिक डैशबोर्ड समाधान दरों पर नज़र रखता है।",
  "cta_title": "क्या आप अपनी पंचायत को बेहतर बनाने के लिए तैयार हैं?",
  "cta_desc": "पारदर्शी स्थानीय शासन में सक्रिय रूप से भाग लेने वाले हजारों नागरिकों से जुड़ें। पंजीकरण में एक मिनट से भी कम समय लगता है।",
  "register_citizen": "नागरिक के रूप में पंजीकरण करें",
  "footer_desc": "नागरिकों को कुशल और पारदर्शी तरीके से अपने स्थानीय शासन को जोड़ने, रिपोर्ट करने और सुधारने के लिए सशक्त बनाने वाली एक डिजिटल पहल। आइए मिलकर एक बेहतर समुदाय बनाएं।",
  "quick_links": "महत्वपूर्ण लिंक",
  "about_initiative": "पहल के बारे में",
  "citizen_charter": "नागरिक चार्टर",
  "view_public_dashboard": "सार्वजनिक डैशबोर्ड देखें",
  "help_faq": "मदद और अक्सर पूछे जाने वाले प्रश्न",
  "contact_us": "संपर्क करें",
  "address": "केंद्रीय पंचायत भवन,<br/>नई दिल्ली, भारत 110001",
  "toll_free": "टोल फ्री, सुबह 8 बजे से रात 8 बजे तक",
  "copy_right": "© 2026 स्मार्ट पंचायत ई-गवर्नेंस सिस्टम। सर्वाधिकार सुरक्षित।",
  "privacy_policy": "गोपनीयता नीति",
  "terms_of_service": "सेवा की शर्तें",
  "accessibility": "पहुंच-योग्यता"
};

const mrNew = {
  "features_title_1": "पारदर्शक कारभारासाठी",
  "features_title_2": "स्मार्ट वैशिष्ट्ये",
  "features_desc": "सामुदायिक समस्यांची तक्रार आणि प्रभावीपणे ट्रॅक करण्यासाठी आपल्याला आवश्यक असलेली प्रत्येक गोष्ट.",
  "feat1_title": "जीपीएस टॅगिंग",
  "feat1_desc": "अचूक असाइनमेंटसाठी स्वयंचलित स्थान मॅपिंग.",
  "feat2_title": "मीडिया अपलोड",
  "feat2_desc": "उच्च गुणवत्तेत फोटो आणि व्हिडिओ पुरावे जोडा.",
  "feat3_title": "स्मार्ट अलर्ट",
  "feat3_desc": "थेट तुमच्या मोबाईलवर रिअल-टाइम अपडेट्स.",
  "feat4_title": "ओपन डेटा",
  "feat4_desc": "सार्वजनिक डॅशबोर्ड रिझोल्यूशन दरांचा मागोवा घेत आहे.",
  "cta_title": "तुमची पंचायत सुधारण्यास तयार आहात?",
  "cta_desc": "पारदर्शक स्थानिक कारभारामध्ये सक्रियपणे सहभागी होणाऱ्या हजारो नागरिकांमध्ये सामील व्हा. नोंदणीला एका मिनिटापेक्षा कमी वेळ लागतो.",
  "register_citizen": "नागरिक म्हणून नोंदणी करा",
  "footer_desc": "नागरिकांना त्यांच्या स्थानिक कारभाराशी कार्यक्षमतेने आणि पारदर्शकपणे जोडण्यासाठी, अहवाल देण्यासाठी आणि सुधारित करण्यासाठी सक्षम करणारा डिजिटल उपक्रम. चला मिळून एक चांगला समुदाय घडवूया.",
  "quick_links": "महत्त्वाच्या लिंक्स",
  "about_initiative": "उपक्रमाबद्दल",
  "citizen_charter": "नागरिक सनद",
  "view_public_dashboard": "सार्वजनिक डॅशबोर्ड पहा",
  "help_faq": "मदत आणि वारंवार विचारले जाणारे प्रश्न",
  "contact_us": "संपर्क साधा",
  "address": "केंद्रीय पंचायत भवन,<br/>नवी दिल्ली, भारत 110001",
  "toll_free": "टोल फ्री, सकाळी 8 ते रात्री 8 पर्यंत",
  "copy_right": "© 2026 स्मार्ट पंचायत ई-गव्हर्नन्स सिस्टीम. सर्व हक्क राखीव.",
  "privacy_policy": "गोपनीयता धोरण",
  "terms_of_service": "सेवा अटी",
  "accessibility": "प्रवेशयोग्यता"
};

const updateJSON = (file, newObj) => {
  const content = JSON.parse(fs.readFileSync(file, 'utf8'));
  const updated = { ...content, ...newObj };
  fs.writeFileSync(file, JSON.stringify(updated, null, 2), 'utf8');
}

updateJSON('./src/locales/en/translation.json', enNew);
updateJSON('./src/locales/hi/translation.json', hiNew);
updateJSON('./src/locales/mr/translation.json', mrNew);
