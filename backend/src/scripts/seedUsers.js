require('dotenv').config({ path: '../../.env' });
const bcrypt = require('bcrypt');
const { drizzle } = require('drizzle-orm/neon-http');
const { neon } = require('@neondatabase/serverless');
const { employees, userLogin } = require('../db/schema');

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

async function seedTestUsers() {
  try {
    console.log("🌱 Seeding HR users...");
    const hrUsers = [
      { email: 'hr1@eil.co.in', firstName: 'Priya', lastName: 'Verma', personalEmail: 'hr1@gmail.com', password: 'hrpass1' },
      { email: 'hr2@eil.co.in', firstName: 'Raj', lastName: 'Sharma', personalEmail: 'hr2@gmail.com', password: 'hrpass2' },
    ];

    for (let i = 0; i < hrUsers.length; i++) {
      const user = hrUsers[i];
      const passwordHash = await bcrypt.hash(user.password, 12);

      const [hrInserted] = await db.insert(employees).values({
        orgEmail: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        personalEmail: user.personalEmail,
        isHr: true,
      }).returning();

      await db.insert(userLogin).values({
        employeeId: hrInserted.employeeId,
        passwordHash,
        role: 'hr',
      });

      console.log(`✅ HR ${i + 1}: ID=${hrInserted.employeeId}, Email=${user.email}, Password=${user.password}`);
    }

    console.log("\n🌱 Seeding Employee users...");
    const empUsers = [
      { email: 'emp1@eil.co.in', firstName: 'John', lastName: 'Doe', personalEmail: 'emp1@gmail.com', password: 'emp123' },
      { email: 'emp2@eil.co.in', firstName: 'Jane', lastName: 'Smith', personalEmail: 'emp2@gmail.com', password: 'emp456' },
      { email: 'emp3@eil.co.in', firstName: 'Mike', lastName: 'Brown', personalEmail: 'emp3@gmail.com', password: 'emp789' },
    ];

    for (let i = 0; i < empUsers.length; i++) {
      const user = empUsers[i];
      const passwordHash = await bcrypt.hash(user.password, 12);

      const [empInserted] = await db.insert(employees).values({
        orgEmail: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        personalEmail: user.personalEmail,
        isHr: false,
      }).returning();

      await db.insert(userLogin).values({
        employeeId: empInserted.employeeId,
        passwordHash,
        role: 'employee',
      });

      console.log(`✅ Employee ${i + 1}: ID=${empInserted.employeeId}, Email=${user.email}, Password=${user.password}`);
    }

    console.log("\n🎉 All users seeded successfully.");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  }
}

seedTestUsers();
