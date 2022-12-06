
/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { MdOutlineDesignServices, MdPersonOutline } from "react-icons/md"

//  PLUGINS
import { colorInput } from '@sanity/color-input'
import { media } from "sanity-plugin-media"
import { visionTool } from '@sanity/vision'
import { defineConfig, Slug } from 'sanity'
import { deskTool } from 'sanity/desk'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'

// PREVIEWS  
import { PostsPreview } from './components/previews/PostsPreview'

//  DOCUMENTS
import authorType from './schemas/documents/author'
import postType from './schemas/documents/blog'
import settingsType from './schemas/settings'
import homeDocument from './schemas/documents/home'
import profileDocument from './schemas/documents/profile'
import pagesDocument from './schemas/documents/pages'
import appearanceDocument from './schemas/documents/appearance'
import testimonialsDocument from './schemas/documents/testimonials'
// import pressDocument from './schemas/documents/press'
import teamDocument from './schemas/documents/team'
import navigationDocument from './schemas/documents/navigation'
import servicesDocument from './schemas/documents/services'
import legalDocument from './schemas/documents/legal'
import pageSettingsDocument from "./schemas/documents/page-settings"

// OBJECTS
import contentObject from './schemas/objects/content'
import seoObject from './schemas/objects/seo'
import contactObject from './schemas/objects/contact'
import youtubeObject from './schemas/objects/youtube'
import locationObject from './schemas/objects/location'
import socialObject from './schemas/objects/social'
import mainColorObject from './schemas/objects/maincolors'
import headerMenuObject from './schemas/objects/headermenu'
import brandingObject from './schemas/objects/branding'
import imagecolorObject from './schemas/objects/imagecolor'
import submenuObject from './schemas/objects/submenu'
import navigationObject from './schemas/objects/navigation'
import textcolorObject from './schemas/objects/textcolor'
import linksObject from './schemas/objects/links'
import editorLinkObject from './schemas/objects/editorLink'
import buttonSettingsObject from './schemas/objects/button-settings'
import secondaryButtonObject from './schemas/objects/secondary-button'
import imageObject from './schemas/objects/image'
import backgroundTextOptionsObject from './schemas/objects/background-text-option'

//  PAGEBUILDER
import heroBuilder from './schemas/pagebuilder/hero'
import contactBuilder from './schemas/pagebuilder/contact'
import fullWidthTextImageBuilder from './schemas/pagebuilder/fullwidth-text-image'
import bannerBuilder from './schemas/pagebuilder/banner'
import disclosureBuilder from './schemas/pagebuilder/disclosure'
import codeBuilder from './schemas/pagebuilder/code'
import testimonialsBuilder from './schemas/pagebuilder/testimonials'
import imageGalleryBuilder from './schemas/pagebuilder/image-gallery'
import featuredGridBuilder from './schemas/pagebuilder/featured-grid'
import textImageBuilder from './schemas/pagebuilder/text-and-image'
import leadFormBuilder from './schemas/pagebuilder/lead-form'
import pricingBuilder from './schemas/pagebuilder/pricing'
import logosBuilder from './schemas/pagebuilder/logos'
import teamSectionBuilder from './schemas/pagebuilder/team-section'
import blogSectionBuilder from './schemas/pagebuilder/blog-section'
import iconSectionBuilder from './schemas/pagebuilder/icon-section'
import servicesSectionBuilder from './schemas/pagebuilder/service-section'


// @TODO: update next-sanity/studio to automatically set this when needed
const basePath = '/admin'

export default defineConfig({
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
      // settingsType,
      appearanceDocument,
      profileDocument,
      pageSettingsDocument,
      homeDocument,
      navigationDocument,
      pagesDocument,
      servicesDocument,
      teamDocument,
      testimonialsDocument,
      // pressDocument,
      postType,
      authorType,
      legalDocument,
      // OBJECTS
      textcolorObject,
      contentObject,
      editorLinkObject,
      youtubeObject,
      buttonSettingsObject,
      secondaryButtonObject,
      imageObject,
      seoObject,
      contactObject,
      locationObject,
      socialObject,
      mainColorObject,
      headerMenuObject,
      linksObject,
      brandingObject,
      imagecolorObject,
      backgroundTextOptionsObject,
      submenuObject,
      navigationObject,
      // PAGEBUILDER
      heroBuilder,
      codeBuilder,
      testimonialsBuilder,
      imageGalleryBuilder,
      pricingBuilder,
      teamSectionBuilder,
      blogSectionBuilder,
      contactBuilder,
      bannerBuilder,
      iconSectionBuilder,
      disclosureBuilder,
      fullWidthTextImageBuilder,
      leadFormBuilder,
      textImageBuilder,
      featuredGridBuilder,
      servicesSectionBuilder,
      logosBuilder
    ],
  },
  plugins: [
    colorInput(),
    deskTool({
      structure: (S) => {

        const profileListItem = // A singleton not using `documentListItem`, eg no built-in preview
          S.listItem()
            .title(profileDocument.title)
            .icon(MdPersonOutline)
            .child(
              S.editor()
                .id(profileDocument.name)
                .schemaType(profileDocument.name)
                .documentId(profileDocument.name)
            )

        const appearanceListItem = // A singleton not using `documentListItem`, eg no built-in preview
          S.listItem()
            .title(appearanceDocument.title)
            .icon(MdOutlineDesignServices)
            .child(
              S.editor()
                .id(appearanceDocument.name)
                .schemaType(appearanceDocument.name)
                .documentId(appearanceDocument.name)
            )

        const PageSettingsListItem = // A singleton not using `documentListItem`, eg no built-in preview
          S.listItem()
            .title(pageSettingsDocument.title)
            .child(
              S.editor()
                .id(pageSettingsDocument.name)
                .schemaType(pageSettingsDocument.name)
                .documentId(pageSettingsDocument.name)
            )

        // The default root list items (except custom ones)
        const defaultListItems = S.documentTypeListItems().filter(
          (listItem) => ![settingsType.name, appearanceDocument.name, pageSettingsDocument.name, profileDocument.name].includes(listItem.getId())
        )

        return S.list()
          .title('Content')
          .items([profileListItem, appearanceListItem, PageSettingsListItem, S.divider(), ...defaultListItems])
      },

      // `defaultDocumentNode is responsible for adding a “Preview” tab to the document pane
      // You can add any React component to `S.view.component` and it will be rendered in the pane
      // and have access to content in the form in real-time.
      // It's part of the Studio's “Structure Builder API” and is documented here:
      // https://www.sanity.io/docs/structure-builder-reference
      defaultDocumentNode: (S, { schemaType }) => {
        if (schemaType === postType.name) {
          return S.document().views([
            S.view.form(),
            S.view.component(PostsPreview).title('Preview'),
          ])
        }

        if (schemaType === homeDocument.name) {
          return S.document().views([
            S.view.form(),
            S.view.component(PostsPreview).title('Preview'),
          ])
        }

        if (schemaType === pagesDocument.name) {
          return S.document().views([
            S.view.form(),
            S.view.component(PostsPreview).title('Preview'),
          ])
        }

        if (schemaType === servicesDocument.name) {
          return S.document().views([
            S.view.form(),
            S.view.component(PostsPreview).title('Preview'),
          ])
        }

        if (schemaType === teamDocument.name) {
          return S.document().views([
            S.view.form(),
            S.view.component(PostsPreview).title('Preview'),
          ])
        }

        if (schemaType === legalDocument.name) {
          return S.document().views([
            S.view.form(),
            S.view.component(PostsPreview).title('Preview'),
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
          case profileDocument.name:
            break
          case appearanceDocument.name:
            break
          case pageSettingsDocument.name:
            break
          case homeDocument.name:
            url.searchParams.set('slug', (document.slug as Slug).current!)
            break
          case pagesDocument.name:
            url.searchParams.set('slug', (document.slug as Slug).current!)
            break
          case legalDocument.name:
            url.searchParams.set('slug', (document.slug as Slug).current!)
            break
          case servicesDocument.name:
            url.searchParams.set('slug', (document.slug as Slug).current!)
            break
          case teamDocument.name:
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
          (templateItem) => ![templateItem]

        )
      }

      return prev
    },
    

    // Removes the "duplicate" action on the document
    actions: (prev, { schemaType }) => {
      if (schemaType === appearanceDocument.name) {
        return prev.filter(({ action }) => action !== 'delete')
      }

      return prev
    },
  },
})
