import { defineField, defineType } from 'sanity'

export const siteConfig = defineType({
  name: 'siteConfig',
  title: 'Site Configuration & SEO',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      description: 'Main title of the website (e.g. Dubrovnik Taxi Cab)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'SEO Description',
      type: 'text',
      description: 'Meta description for search engines (Google). Max 160 characters.',
      validation: (rule) => rule.max(160).warning('Optimal SEO description is under 160 characters.'),
    }),
    defineField({
      name: 'keywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Keywords for SEO (e.g., "taxi dubrovnik", "airport transfer dubrovnik").',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image (Social Share Image)',
      type: 'image',
      description: 'Image shown when sharing the link on Facebook, WhatsApp, etc.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'url',
      title: 'Website URL',
      type: 'url',
      initialValue: 'https://www.dubrovniktaxicab.com',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'Format MUST include country code without '+', e.g. 385912345678',
      validation: (rule) => rule.required(),
    }),
  ],
})
