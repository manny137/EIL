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
  adhaarNo: varchar('adhaar_no', { length: 12 }).unique().notNull(),
  panNo: varchar('pan_no', { length: 10 }).unique().notNull(),
  verifiedBy: serial('verified_by'),
  verifiedAt: timestamp('verified_at').defaultNow(),
});

const hr = pgTable('hr', {
  employeeId: serial('employee_id').primaryKey(),
  dept: text('dept').notNull(),
});

const userLogin = pgTable('user_login', {
  employeeId: serial('employee_id').primaryKey(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').notNull(), // 'employee' or 'hr'
  createdAt: timestamp('created_at').defaultNow(),
});

module.exports = {
  pendingEmployee,
  employee,
  hr,
  userLogin,
};
