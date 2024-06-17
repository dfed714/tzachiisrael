import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'teamMembers',
  title: 'Team Members',
  type: 'document',
  fields: [
    defineField({
      name: 'position',
      title: 'Position',
      type: 'number',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'memberImage',
      title: 'Member image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
