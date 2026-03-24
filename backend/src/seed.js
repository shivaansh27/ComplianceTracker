require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Client = require('./models/Client');
const Task = require('./models/Task');

const clients = [
  { company_name: 'ABC Pvt Ltd', country: 'India', entity_type: 'Pvt Ltd' },
  { company_name: 'XYZ Corp', country: 'USA', entity_type: 'LLC' },
  { company_name: 'FinEdge LLC', country: 'UAE', entity_type: 'LLC' },
];

const getTasksForClient = (clientId) => {
  const now = new Date();
  const past = (days) => new Date(now - days * 24 * 60 * 60 * 1000);
  const future = (days) => new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

  return [
    {
      client_id: clientId,
      title: 'Income Tax Return Filing',
      description: 'File annual income tax return for the fiscal year.',
      category: 'Tax',
      due_date: past(9),
      status: 'Pending',
      priority: 'High',
    },
    {
      client_id: clientId,
      title: 'GST Monthly Return',
      description: 'Submit monthly GST return.',
      category: 'Filing',
      due_date: past(6),
      status: 'Completed',
      priority: 'Medium',
    },
    {
      client_id: clientId,
      title: 'Annual General Meeting',
      description: 'Conduct AGM as per company law requirements.',
      category: 'Compliance',
      due_date: future(12),
      status: 'Pending',
      priority: 'High',
    },
    {
      client_id: clientId,
      title: 'Board Resolution for Loan',
      description: 'Draft and pass board resolution for new loan.',
      category: 'Other',
      due_date: future(19),
      status: 'Pending',
      priority: 'Low',
    },
    {
      client_id: clientId,
      title: 'TDS Quarterly Filing',
      description: 'File TDS return for the quarter.',
      category: 'Tax',
      due_date: past(3),
      status: 'In Progress',
      priority: 'High',
    },
    {
      client_id: clientId,
      title: 'ROC Annual Filing',
      description: 'File annual returns with Registrar of Companies.',
      category: 'Filing',
      due_date: future(30),
      status: 'Pending',
      priority: 'Medium',
    },
  ];
};

const seedDB = async () => {
  try {
    await connectDB();

    await Task.deleteMany({});
    await Client.deleteMany({});
    console.log('Cleared existing data');

    const insertedClients = await Client.insertMany(clients);
    console.log(`Inserted ${insertedClients.length} clients`);

    const allTasks = insertedClients.flatMap((client) => getTasksForClient(client._id));
    await Task.insertMany(allTasks);
    console.log(`Inserted ${allTasks.length} tasks`);

    console.log('✅ Seed complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
};

seedDB();