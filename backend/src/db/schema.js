const { integer, varchar, pgSchema } = require("drizzle-orm/pg-core");

const eil = pgSchema("eil");

const usersTable = eil.table("yeah", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

module.exports = { usersTable };
