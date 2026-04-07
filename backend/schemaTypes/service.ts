import {defineField, defineType} from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Services (Usluge)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Zadivljujući naslov usluge (npr. Dubrovnik Airport Transfer)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Poveznica (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'iconName',
      title: 'Naziv Ikonice (Frontend)',
      type: 'string',
      description: 'Dostupno: car, clock, shield, mappin, map',
      options: {
        list: [
          {title: 'Auto', value: 'car'},
          {title: 'Sat', value: 'clock'},
          {title: 'Štit/Sigurnost', value: 'shield'},
          {title: 'GPS Igla', value: 'mappin'},
          {title: 'Karta', value: 'map'},
        ],
      },
    }),
    defineField({
      name: 'shortDescription',
      title: 'Kratki Opis',
      type: 'text',
      description: 'Prikazuje se na glavnoj stranici s uslugama.',
    }),
    defineField({
      name: 'mainImage',
      title: 'Glavna Slika',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'content',
      title: 'Sadržaj',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternativni tekst (SEO)',
              description: 'Kratki opis slike (važno za SEO).',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Naslov',
      type: 'string',
      description: 'Preporučeno: 50-60 znakova.',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Kratki Opis (Description)',
      type: 'text',
      description: 'Preporučeno: 120-150 znakova.',
      group: 'seo',
    }),
  ],
  groups: [
    {
      name: 'seo',
      title: 'SEO Postavke',
    },
  ],
})
