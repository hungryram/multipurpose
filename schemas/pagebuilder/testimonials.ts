import { defineType } from "sanity";

export default defineType({
    title: 'Testimonials',
    name: 'testimonialBuilder',
    type: 'object',
    groups: [
        {name: 'content', title: 'Content'},
        {name: 'settings', title: 'Settings'},
      ],
    fields: [
        {
            title: 'Heading',
            name: 'heading',
            type: 'string',
            group: 'content',
            description: 'The testimonials are automatically pulled from the testimonials sidebar'
        },
        {
            title: 'Content',
            name: 'content',
            type: 'contentEditor',
            group: 'content',
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
            title: 'Number of Columns',
            name: 'columnNumber',
            type: 'number',
            group: 'settings'
        },
        {
            title: 'Enable Carousel',
            name: 'carousel',
            type: 'boolean',
            description: 'Displayed grid view by default',
            group: 'settings',
        },
        {
            title: 'Text Left',
            name: 'textLeft',
            type: 'boolean',
            group: 'settings',
        },
        {
            title: 'Testimonial Card Background Color',
            name: 'cardBackground',
            group: 'settings',
            type: 'color',
            options: {
                disableAlpha: true
            }
        },
        {
            title: 'Testimonial Card Text Color',
            name: 'cardTextColor',
            group: 'settings',
            type: 'color',
            options: {
                disableAlpha: true
            }
        },
        {
            title: 'Background Options',
            name: 'background',
            group: 'settings',
            type: 'backgroundOptions',
        },

    ],
    preview: {
        select: {
            title: 'content'
        }
    }
})