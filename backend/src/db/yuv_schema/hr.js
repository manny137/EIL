const { pgTable, serial, varchar, date ,pgSchema} = require("drizzle-orm/pg-core");
import { sql } from "drizzle-orm";


const eil = pgSchema('eil');

const hr = eil.table("hr", {
  empId: serial("emp_id").primaryKey(), // HR uses empId to login
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
 // dob: date("dob").notNull(),
  password: varchar("password", { length: 255 }).notNull(), // hashed
});

module.exports = { hr };
