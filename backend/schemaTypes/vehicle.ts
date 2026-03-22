import { defineField, defineType } from 'sanity'

export const vehicle = defineType({
  name: 'vehicle',
  title: 'My Vehicle',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Vehicle Name (e.g. Mercedes-Benz E-Class)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Vehicle Type',
      type: 'string',
      options: {
        list: [
          { title: 'Limousine / Sedan', value: 'Sedan' },
          { title: 'Estate / Karavan', value: 'Estate' },
          { title: 'SUV', value: 'SUV' },
          { title: 'Minivan / Van', value: 'Minivan' },
        ]
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'passengers',
      title: 'Max Passengers',
      type: 'number',
      initialValue: 4,
      validation: (rule) => rule.required().min(1).max(10),
    }),
    defineField({
      name: 'luggage',
      title: 'Max Luggage (Suitcases)',
      type: 'number',
      initialValue: 4,
      validation: (rule) => rule.required().min(1).max(15),
    }),
    defineField({
      name: 'features',
      title: 'Features & Amenities',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Air Conditioning', value: 'Air Conditioning' },
          { title: 'Free Wi-Fi', value: 'Free Wi-Fi' },
          { title: 'Bottled Water', value: 'Bottled Water' },
          { title: 'Phone Chargers (USB)', value: 'Phone Chargers' },
          { title: 'Child Seat Available', value: 'Child Seat Available' },
          { title: 'Extra Legroom', value: 'Extra Legroom' },
          { title: 'Leather Seats', value: 'Leather Seats' },
        ]
      },
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      description: 'Describe the comfort of the ride.',
    }),
    defineField({
      name: 'gallery',
      title: 'Vehicle Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true }
        }
      ],
      description: 'Upload images of the exterior and interior.',
      options: {
        layout: 'grid'
      }
    }),
  ],
})
