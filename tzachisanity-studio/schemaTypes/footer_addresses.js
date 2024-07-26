import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'footerAddresses',
  title: 'Footer Addresses',
  type: 'document',
  fields: [
    defineField({
      name: 'footerAddress1',
      title: 'Footer Address 1',
      type: 'string',
    }),
    defineField({
      name: 'footerAddress2',
      title: 'Footer Address 2',
      type: 'string',
    }),
  ],
})
