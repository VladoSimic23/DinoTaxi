import { defineField, defineType } from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage Content',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'subheading', title: 'Subtitle', type: 'text' },
        { name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } },
        { name: 'ctaText', title: 'Call to Action Button Text', type: 'string', initialValue: 'Book Now via WhatsApp' }
      ]
    }),
    defineField({
      name: 'about',
      title: 'About Us Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' },
        { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
      ]
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'iconName', title: 'Icon (e.g. Car, Plane, MapPin)', type: 'string' },
            { name: 'title', title: 'Service Title', type: 'string' },
            { name: 'description', title: 'Service Description', type: 'text' },
          ]
        }
      ]
    }),
    defineField({
      name: 'faq',
      title: 'Frequently Asked Questions (SEO boost)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Answer', type: 'text' },
          ]
        }
      ]
    })
  ]
})
