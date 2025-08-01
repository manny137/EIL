require('dotenv').config();
const { defineConfig } = require('drizzle-kit');

module.exports = defineConfig({
  out: './drizzle',
  schema: './src/db/schema.js',
  dialect: 'postgresql', // ✅ This is what your version expects
  dbCredentials: {
    url: process.env.DATABASE_URL, // ✅ Uses 'url' instead of 'connectionString'
  },
  schemaFilter: ['eil'],
});
