const cron = require('node-cron');
const Grievance = require('../models/Grievance');

// Setup Cron Job - Runs every hour to check for overdue grievances
const startCronJobs = () => {
    cron.schedule('0 * * * *', async () => {
        try {
            console.log('Running Escalation Cron Job...');
            const now = new Date();

            const overdueGrievances = await Grievance.find({
                status: { $in: ['Pending', 'In Progress'] },
                deadline: { $lt: now },
                isOverdue: false
            });

            if (overdueGrievances.length > 0) {
                console.log(`Found ${overdueGrievances.length} overdue grievances. Escalating...`);

                const ids = overdueGrievances.map(g => g._id);

                await Grievance.updateMany(
                    { _id: { $in: ids } },
                    { 
                        $set: { 
                             status: 'Escalated',
                             isOverdue: true 
                        } 
                    }
                );

                console.log('Escalation complete.');
            } else {
                 console.log('No overdue grievances found.');
            }
        } catch (error) {
            console.error('Error in Escalation Cron Job:', error.message);
        }
    });

    console.log('Cron jobs initialized: Overdue Escalation (hourly)');
};

module.exports = startCronJobs;
