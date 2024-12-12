export async function up(knex) {
    return knex.schema.createTable('entries', (table) => {
      table.increments('id')
      table.string('date')
      table.string('location_name')
      table.string('details')
      
    })
  }
  
  export async function down(knex) {
    return knex.schema.dropTable('entries')
  }


  