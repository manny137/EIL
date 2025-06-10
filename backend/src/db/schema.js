const { integer, varchar, pgSchema } = require("drizzle-orm/pg-core");

const eil = pgSchema("eil");

const usersTable = eil.table("tab2", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

const bigTable = eil.table("tab1", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

module.exports = { usersTable, bigTable };
