// Mock SMS Service since we are using dummy keys.
// When real keys are added in .env, this can be swapped with real Twilio SDK integration.

const sendSMS = async (to, message) => {
    console.log(`\n================= SMS NOTIFICATION =================`);
    console.log(`TO: ${to}`);
    console.log(`MESSAGE: ${message}`);
    console.log(`====================================================\n`);
    return true;
};

module.exports = { sendSMS };
