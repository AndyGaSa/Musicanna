import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'titol del post que es veura!',
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      description: 'Idioma del post',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'descripcio breu del post',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description:
        'Clicar en el boto "Generate" de la dreta cuan el post es nou, despres deixar-ho com esta',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Imatge de previsualitzacio del post i capcalera de aquest',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
      description:
        'Categoria a la que perteneix el post, VIGILAR que EL IDIOMA sigui el corresponent',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      description:
        'Contingut del post que es mostrara, es poden adjuntar imatges,videos text o cancons. Mirar que el idioma sigui el correcte!',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      language: 'language',
      media: 'mainImage',
    },
    prepare(selection) {
      const {language} = selection
      return {...selection, subtitle: language}
    },
  },
})
