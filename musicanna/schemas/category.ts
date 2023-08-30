import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: '!NO TOCAR! Escriure minuscules',
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      description: 'idioma de la categoria',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Titol que apareix com capcalera de la categoria en el idioma solicitat',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      description: 'text descriptiu de la categoria, ha de estar a el idioma corresponent',
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
