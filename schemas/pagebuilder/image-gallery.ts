import { defineType } from "sanity";
import React from "react";

export default defineType({
    name: 'gallery',
    type: 'object',
    title: 'Gallery',
    groups: [
        {title: 'Content', name: 'content'},
        {title: 'Settings', name: 'settings'},
    ],
    fields: [
        {
          title: 'Heading',
          name: 'heading',
          type: 'string',
          group: 'content'
        },
        {
            title: 'Content',
            name: 'content',
            type: 'contentEditor',
            group: 'content'
        },
        {
            title: 'Primary Button',
            name: 'button',
            type: 'buttonSettings',
            group: 'content'
        },
        {
          title: 'Secondary Button',
          name: 'secondaryButton',
          type: 'secondaryButton',
          group: 'content'
      },
        {
          title: 'Images',
          name: 'images',
          type: 'array',
          of: [
            {
            title: 'Image',
            name: 'image',
            type: 'image',
            }
          ],
          options: {
            layout: 'grid',
          },
        },
        {
            title: 'Animation',
            name: 'animation',
            type: 'string',
            options: {
                list: [
                    {title: 'Fade', value: 'fade'},
                    {title: 'Slide', value: 'slide'},
                ]
            },
            group: 'settings',
        },
        {
            title: 'Disable Pagination',
            name: 'disablePagination',
            type: 'boolean',
            group: 'settings',
        },
        {
            title: 'Disable Navigation Arrows',
            name: 'disableNavigation',
            type: 'boolean',
            group: 'settings',
        },
        {
            title: 'Full Width',
            name: 'fullWidth',
            type: 'boolean',
            group: 'settings',
        },
        {
          title: 'Remove Padding',
          name: 'removePadding',
          type: 'boolean',
          group: 'settings',
      },
        {
          title: 'Background Options',
          name: 'background',
          group: 'settings',
          type: 'backgroundOptions',
      }
      ],
      preview: {
        select: {
          images: 'images',
          image: 'images',
        },
        prepare(selection) {
          const { images, image } = selection;
          return {
            title: `Gallery section of ${images.length} images`,
            media: image[0].image,
          };
        },
      },
})