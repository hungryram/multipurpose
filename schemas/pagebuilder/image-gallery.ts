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
          title: 'Images',
          name: 'images',
          type: 'array',
          of: [
            {type: 'photo'}
          ],
          options: {
            layout: 'grid',
          },
        },
        {
            title: 'Content',
            name: 'content',
            type: 'contentEditor',
            group: 'content'
        },
        {
            title: 'Button',
            name: 'button',
            type: 'buttonSettings',
            group: 'content'
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
            title: 'Background Color',
            name: 'background',
            type: 'color',
            group: 'settings',
        },
        {
            title: 'Text Color',
            name: 'textColor',
            type: 'color',
            group: 'settings',
        },
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