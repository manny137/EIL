const { pgTable, serial, varchar, date ,pgSchema} = require("drizzle-orm/pg-core");
import { sql } from "drizzle-orm";


const eil = pgSchema('eil');


const pemployee = eil.table("pending_employee", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  //dob: date("dob").notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  aadhaarPath: varchar("aadhaar_path", { length: 255 }).notNull(),
  panPath: varchar("pan_path", { length: 255 }).notNull(),
});

module.exports = { pemployee };
