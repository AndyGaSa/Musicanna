import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: '!NO TOCAR!',
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      description: 'idioma de la pagina de contacte',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description:
        'Titol que apareix com capcalera de la seccio de contacte en el idioma solicitat',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      description: 'text per mostrar al qui som-contacte, ha de estar a el idioma corresponent',
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
