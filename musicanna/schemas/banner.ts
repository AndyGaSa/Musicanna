import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'banner',
  title: 'BannerPhotos',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description:
        'Posicio de la foto a la pantalla de inici, la numero 1 surt la primera i el numero mes gran el ultim',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      subtitle: 'order',
    },
  },
})
