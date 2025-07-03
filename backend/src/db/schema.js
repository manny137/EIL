const { serial, text, varchar, date, timestamp, integer, pgSchema, boolean } = require('drizzle-orm/pg-core');
const { drizzle } = require('drizzle-orm/node-postgres');
const eil = pgSchema('eil');


const employees = eil.table('employee', {
  employeeId: serial('employee_id').primaryKey(),
  orgEmail: text('email').unique().notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  personalEmail: text('personal_email').notNull(),
  phone: varchar('phone', { length: 15 }),
  dob: date('dob'),
  address: text('address'),
  gender: text('gender'),
  dept: text('dept'),
  adhaarNo: varchar('adhaar_no', { length: 12 }),
  panNo: varchar('pan_no', { length: 10 }),
  isHr: boolean('is_hr').default(false).notNull(),
  verifiedBy: integer('verified_by'),
  verifiedAt: timestamp('verified_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

const userLogin = eil.table('user_login', {
  employeeId: integer('employee_id').primaryKey(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').notNull(), // 'employee' or 'hr'
  createdAt: timestamp('created_at').defaultNow(),
});

const tentativeEmployees = eil.table('tentative_employees', {
  id: serial('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  personalEmail: text('personal_email').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

const bankDetails = eil.table('bank_details', {
  id: serial('id').primaryKey(),
  employeeId: integer('employee_id').notNull(),
  accountNumber: text('account_number').notNull(),
  ifsc: text('ifsc').notNull(),
  bankName: text('bank_name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

const leaveApplications = eil.table('leave_applications', {
  id: serial('id').primaryKey(),
  employeeId: integer('employee_id').notNull(),
  fromDate: date('from_date').notNull(),
  toDate: date('to_date').notNull(),
  reason: text('reason').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

module.exports = {
  employees,
  userLogin,
  tentativeEmployees,
  bankDetails,
  leaveApplications,
};
