import { defineType } from "sanity";

export default defineType({
    title: 'Full Width Text and Image',
    name: 'fullWidthTextImage',
    type: 'object',
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
            validation: (Rule) => Rule.required(),
        },
        {
            title: 'Image',
            name: 'image',
            type: 'image',
            validation: (Rule) => Rule.required(),
        },
        {
            title: 'Button',
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
            title: 'Reverse Column',
            name: 'reverseColumn',
            group: 'settings',
            type: 'boolean',
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
            title: 'content',
            media: 'image'
        },
    }
})