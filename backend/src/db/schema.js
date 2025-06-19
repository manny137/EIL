const { pgTable, serial, text, timestamp, pgSchema } = require('drizzle-orm/pg-core');

const eil = pgSchema('eil');

const tentativeEmployees = eil.table('tentative_employees', {
  id: serial('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  personalEmail: text('personal_email').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

module.exports = {
  tentativeEmployees
};
