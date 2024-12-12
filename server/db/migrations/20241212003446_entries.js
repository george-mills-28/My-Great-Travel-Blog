export async function up(knex) {
    return knex.schema.createTable('entries', (table) => {
      table.increments('id')
      table.date('date')
      table.string('location_name')
      table.string('details', 1000)
      table.string('image_url')
      table.timestamps(true, true)
    })
  }
  
  export async function down(knex) {
    return knex.schema.dropTable('entries')
  }


  