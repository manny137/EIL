const { integer, varchar, pgSchema } = require("drizzle-orm/pg-core");

const eil = pgSchema("eil");

const employee = eil.table("employee", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(), // used as employeeId
  username: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(), // hashed password
});

module.exports = {
  employee,
};
