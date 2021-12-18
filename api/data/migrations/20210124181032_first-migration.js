exports.up = async (knex) => {
  await knex.schema

    // Users table
    .createTable("users", (table) => {
      table.increments("user_id")
      table.string("username", 20)
        .notNullable()
        .unique()
      table.string("password", 20)
        .notNullable()
      table.string("role", 20)
        .notNullable()
    })

    // Foods table
    .createTable("foods", (table) => {
      table.increments("food_id")
      table.string("food_name")
    })

    // Guests table
    .createTable("guests", (table) => {
      table.increments("guest_id")
      table.string("guest_name")
      table.integer("user_id")
        .unsigned()
        .references("user_id")
        .inTable("users")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT")
    })

    // Potluck (Event Info) table
    .createTable("potlucks", (table) => {
      table.increments("potluck_id")
      table.string("potluckName")
        .notNullable()
      table.string("date")
        .notNullable()
      table.string("time")
        .notNullable()
      table.string("location")
        .notNullable()
      table.integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT")
    })

    // Potluck Foods (Info) table
    .createTable("potluck_foods", (table) => {
      table.increments("potluck_food_id")
      table.integer("potluck_id")
        .unsigned()
        .notNullable()
        .references("potluck_id")
        .inTable("potlucks")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT")
      table.integer("food_id")
        .unsigned().notNullable()
        .references("food_id")
        .inTable("foods")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT")
    })

    // Potluck Guests (Event Guests) table
    .createTable("potluck_guests", (table) => {
      table.increments("potluck_guest_id")
      table.integer("potluck_id")
        .unsigned()
        .notNullable()
        .references("potluck_id")
        .inTable("potlucks")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT")
      table.integer("guest_id")
        .unsigned()
        .notNullable()
        .references("guest_id")
        .inTable("guests")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT")
    })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("potluck_guests")
  await knex.schema.dropTableIfExists("potluck_foods")
  await knex.schema.dropTableIfExists("potlucks")
  await knex.schema.dropTableIfExists("guests")
  await knex.schema.dropTableIfExists("foods")
  await knex.schema.dropTableIfExists("users")
}