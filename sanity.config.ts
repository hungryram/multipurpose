
/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

 //  PLUGINS
 import { colorInput } from '@sanity/color-input'
 import { media } from "sanity-plugin-media"
 import { visionTool } from '@sanity/vision'
 import { createConfig, Slug } from 'sanity'
 import { deskTool } from 'sanity/desk'
 import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'

 // PREVIEWS  
 import { PostsPreview } from './components/previews/PostsPreview'
 import { PagesPreview } from './components/previews/PagesPreview'

//  DOCUMENTS
 import authorType from './schemas/author'
 import postType from './schemas/post'
 import settingsType from './schemas/settings'
 import homeDocument from './schemas/documents/home'
 import profileDocument from './schemas/documents/profile'
 import pagesDocument from './schemas/documents/pages'
 import appearanceDocument from './schemas/documents/appearance'
 import navigationDocument from './schemas/documents/navigation'
 
 // OBJECTS
 import contentObject from './schemas/objects/content'
 import seoObject from './schemas/objects/seo'
 import contactObject from './schemas/objects/contact'
 import locationObject from './schemas/objects/location'
 import socialObject from './schemas/objects/social'
 import mainColorObject from './schemas/objects/maincolors'
 import headerMenuObject from './schemas/objects/headermenu'
 import brandingObject from './schemas/objects/branding'
 import imagecolorObject from './schemas/objects/imagecolor'
 import submenuObject from './schemas/objects/submenu'
 import navigationObject from './schemas/objects/navigation'
 import textcolorObject from './schemas/objects/textcolor'

//  PAGEBUILDER
import heroBuilder from './schemas/pagebuilder/hero'
import contactBuilder from './schemas/pagebuilder/contact'
import featuredGridBuilder from './schemas/pagebuilder/featured-grid'
import textImageBuilder from './schemas/pagebuilder/text-and-image'

 
 // @TODO: update next-sanity/studio to automatically set this when needed
 const basePath = '/studio'
 
 export default createConfig({
   basePath,
   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
   title:
     process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE ||
     'Hungry Ram',
   schema: {
     // If you want more content types, you can add them to this array
     types: [
      // DOCUMENTS
      settingsType,
      appearanceDocument,
      profileDocument,
      homeDocument,
      navigationDocument,
      pagesDocument, 
      postType, 
      authorType,
      // OBJECTS
      textcolorObject,
      contentObject,
      seoObject,
      contactObject,
      locationObject,
      socialObject,
      mainColorObject,
      headerMenuObject,
      brandingObject,
      imagecolorObject,
      submenuObject,
      navigationObject,
      // PAGEBUILDER
      heroBuilder,
      contactBuilder,
      textImageBuilder,
      featuredGridBuilder,
    ],
   },
   plugins: [
    colorInput(),
     deskTool({
       structure: (S) => {
        // The `Settings` root list item
        const settingsListItem = // A singleton not using `documentListItem`, eg no built-in preview
          S.listItem()
            .title(settingsType.title)
            .icon(settingsType.icon)
            .child(
              S.editor()
                .id(settingsType.name)
                .schemaType(settingsType.name)
                .documentId(settingsType.name)
            )

            const profileListItem = // A singleton not using `documentListItem`, eg no built-in preview
            S.listItem()
              .title(profileDocument.title)
              .child(
                S.editor()
                  .id(profileDocument.name)
                  .schemaType(profileDocument.name)
                  .documentId(profileDocument.name)
              )

            const homeListItem = // A singleton not using `documentListItem`, eg no built-in preview
            S.listItem()
              .title(homeDocument.title)
              .child(
                S.editor()
                  .id(homeDocument.name)
                  .schemaType(homeDocument.name)
                  .documentId(homeDocument.name)
              )

              const appearanceListItem = // A singleton not using `documentListItem`, eg no built-in preview
              S.listItem()
                .title(appearanceDocument.title)
                .child(
                  S.editor()
                    .id(appearanceDocument.name)
                    .schemaType(appearanceDocument.name)
                    .documentId(appearanceDocument.name)
                )
 
         // The default root list items (except custom ones)
         const defaultListItems = S.documentTypeListItems().filter(
          (listItem) => ![settingsType.name, appearanceDocument.name, profileDocument.name, homeDocument.name, media.tag].includes(listItem.getId())
         )
 
         return S.list()
           .title('Content')
           .items([settingsListItem, profileListItem, appearanceListItem, homeListItem, S.divider(), ...defaultListItems])
       },
 
       // `defaultDocumentNode is responsible for adding a “Preview” tab to the document pane
       // You can add any React component to `S.view.component` and it will be rendered in the pane
       // and have access to content in the form in real-time.
       // It's part of the Studio's “Structure Builder API” and is documented here:
       // https://www.sanity.io/docs/structure-builder-reference
       defaultDocumentNode: (S, { schemaType }) => {
         if (schemaType === 'post') {
           return S.document().views([
             S.view.form(),
             S.view.component(PostsPreview).title('Preview'),
           ])
         }

         if (schemaType === 'pages') {
          return S.document().views([
            S.view.form(),
            S.view.component(PagesPreview).title('Preview'),
          ])
        }
 
         return null
       },
     }),
    media(),
     // Add an image asset source for Unsplash
     unsplashImageAsset(),
     // Vision lets you query your content with GROQ in the studio
     // https://www.sanity.io/docs/the-vision-plugin
     visionTool({
       defaultApiVersion: '2022-08-08',
     }),
   ],
   document: {
     productionUrl: async (prev, { document }) => {
       const url = new URL('/api/preview', location.origin)
       const secret = process.env.NEXT_PUBLIC_PREVIEW_SECRET
       if (secret) {
         url.searchParams.set('secret', secret)
       }
       
       try {
         switch (document._type) {
           case settingsType.name:
             break
          case homeDocument.name:
            break
          case profileDocument.name:
            break
            case pagesDocument.name:
              url.searchParams.set('slug', (document.slug as Slug).current!)
              break
           case postType.name:
             url.searchParams.set('slug', (document.slug as Slug).current!)
             break
           default:
             return prev
         }
         return url.toString()
       } catch {
         return prev
       }
     },


     // Hide 'Settings' from new document options
     // https://user-images.githubusercontent.com/81981/195728798-e0c6cf7e-d442-4e58-af3a-8cd99d7fcc28.png
     newDocumentOptions: (prev, { creationContext }) => {
       if (creationContext.type === 'global') {
         return prev.filter(
           (templateItem) => templateItem.templateId !== settingsType.name
         )
       }
 
       return prev
     },
     
     // Removes the "duplicate" action on the "settings" singleton
     actions: (prev, { schemaType }) => {
       if (schemaType === settingsType.name) {
         return prev.filter(({ action }) => action !== 'duplicate')
       }
 
       return prev
     },
   },
 })
 