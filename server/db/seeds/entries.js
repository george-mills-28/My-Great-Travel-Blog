export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('entries').del()

  // Inserts seed entries
  await knex('entries').insert([
    { id: 1, date: '2024-09-10', location_name: 'Paris', details: 'A great night seeing the Eiffel Tower', image_url: null },
    { id: 2, date: '2024-11-11',location_name: 'London', details: 'Thought the London Bridge was overhyped', image_url: null  },
    { id: 3, date: '2024-12-10', location_name: 'Scotland', details: 'Think we saw Lochy chilliing', image_url: null   },
  ])
}
