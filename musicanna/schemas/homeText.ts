import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homeText',
  title: 'HomeText',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'text principal de la pagina de inici en el idioma solicitat',
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      description: 'idioma del text',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'text secundari de la pagina de inici en el idioma solicitat',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
    },
    prepare(selection) {
      const {language} = selection
      return {...selection, subtitle: language}
    },
  },
})
