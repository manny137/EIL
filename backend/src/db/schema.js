<<<<<<< HEAD
const { pgTable, serial, text, varchar, date, timestamp } = require('drizzle-orm/pg-core');

const pendingEmployee = pgTable('pending_employee', {
  tempEmail: text('temp_email').primaryKey(),
  name: text('name').notNull(),
  dob: date('dob').notNull(),
  adhaarNo: varchar('adhaar_no', { length: 12 }).notNull().unique(),
  panNo: varchar('pan_no', { length: 10 }).notNull().unique(),
  submittedAt: timestamp('submitted_at').defaultNow(),
});

const employee = pgTable('employee', {
  employeeId: serial('employee_id').primaryKey(),
  email: text('email').unique().notNull(),
  name: text('name').notNull(),
  dob: date('dob').notNull(),
  dept: text('dept').notNull(),
  adhaarNo: varchar('adhaar_no', { length: 12 }).unique().notNull(),
  panNo: varchar('pan_no', { length: 10 }).unique().notNull(),
  verifiedBy: serial('verified_by'),
  verifiedAt: timestamp('verified_at').defaultNow(),
});

const hr = pgTable('hr', {
  employeeId: serial('employee_id').primaryKey(),
  
});

const userLogin = pgTable('user_login', {
  employeeId: serial('employee_id').primaryKey(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').notNull(), // 'employee' or 'hr'
=======
const { pgTable, serial, text, timestamp, pgSchema } = require('drizzle-orm/pg-core');

const eil = pgSchema('eil');

const tentativeEmployees = eil.table('tentative_employees', {
  id: serial('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  personalEmail: text('personal_email').notNull(),
>>>>>>> 088f2260f7f5b56f19c40ef7e2135128b18ffc3b
  createdAt: timestamp('created_at').defaultNow(),
});

module.exports = {
<<<<<<< HEAD
  pendingEmployee,
  employee,
  hr,
  userLogin,
=======
  tentativeEmployees
>>>>>>> 088f2260f7f5b56f19c40ef7e2135128b18ffc3b
};
