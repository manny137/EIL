// const { serial, text, varchar, date, timestamp, pgSchema } = require('drizzle-orm/pg-core');

// const eil = pgSchema('eil');

// const employee = eil.table('employee', {
//   employeeId: serial('employee_id').primaryKey(),
//   email: text('email').unique().notNull(),
//   name: text('name').notNull(),
//   dob: date('dob').notNull(),
//   dept: text('dept').notNull(),
//   adhaarNo: varchar('adhaar_no', { length: 12 }).unique().notNull(),
//   panNo: varchar('pan_no', { length: 10 }).unique().notNull(),
//   verifiedBy: serial('verified_by'),
//   verifiedAt: timestamp('verified_at').defaultNow(),
// });

// const hr = eil.table('hr', {
//   employeeId: serial('employee_id').primaryKey(),
// });

// const userLogin = eil.table('user_login', {
//   employeeId: serial('employee_id').primaryKey(),
//   passwordHash: text('password_hash').notNull(),
//   role: text('role').notNull(), // 'employee' or 'hr'
//   createdAt: timestamp('created_at').defaultNow(),
// });

// const tentativeEmployees = eil.table('tentative_employees', {
//   id: serial('id').primaryKey(),
//   firstName: text('first_name').notNull(),
//   lastName: text('last_name').notNull(),
//   personalEmail: text('personal_email').notNull(),
//   createdAt: timestamp('created_at').defaultNow(),
// });

// module.exports = {
//   pendingEmployee,
//   employee,
//   hr,
//   userLogin,
//   tentativeEmployees,
// };

const { pgSchema, serial, text, date, varchar, timestamp } = require('drizzle-orm/pg-core');

const eil = pgSchema('eil');

const pendingEmployee = eil.table('pending_employee', {
  id: serial('id').primaryKey(),
  fullName: text('full_name').notNull(),
  dob: date('dob').notNull(),
  personalEmail: text('personal_email').unique().notNull(),
});

const employee = eil.table('employee', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  dept: text('dept').notNull(),
  email: text('email').unique().notNull(),
});

const userLogin = eil.table('user_login', {
  employeeId: serial('employee_id').primaryKey(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').notNull(), // 'employee' or 'hr'
});


module.exports = {
  pendingEmployee,
  userLogin,
  employee 
}
