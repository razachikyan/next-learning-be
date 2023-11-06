/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.table("users", (table) => {
    table.string("session_id", 255);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.table("users", (table) => {
    return knex.schema.table("users", (table) => {
      table.dropColumn("session_key");
    });
  });
};
