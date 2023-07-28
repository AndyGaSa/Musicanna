import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {documentInternationalization} from '@sanity/document-internationalization'

export default defineConfig({
  name: 'default',
  title: 'Musicanna',
  projectId: 'u8imjmtp',
  dataset: 'production',
  plugins: [
    deskTool(),
    visionTool(),
    documentInternationalization({
      supportedLanguages: [
        {id: 'ca', title: 'Catalan'},
        {id: 'es', title: 'Spanish'},
        {id: 'en', title: 'English'},
      ],
      schemaTypes: ['post', 'category', 'contact', 'homeText'],
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
