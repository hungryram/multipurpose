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
            title: 'Button',
            name: 'button',
            type: 'buttonSettings',
            group: 'content'
        },
        {
            title: 'Enable Carousel',
            name: 'carousel',
            type: 'boolean',
            description: 'Displayed grid view by default',
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
            title: 'content'
        }
    }
})