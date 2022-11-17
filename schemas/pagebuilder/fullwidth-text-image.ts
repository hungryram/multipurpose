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
            options: {
                hotspot: true
            }
        },
        {
            title: 'Button',
            name: 'button',
            type: 'buttonSettings',
            group: 'content'
        },
        {
            title: 'Background Color',
            name: 'backgroundColor',
            type: 'color'
        },
        {
            title: 'Text Color',
            name: 'textColor',
            type: 'color'
        },
        {
            title: 'Reverse Column',
            name: 'reverseColumn',
            type: 'boolean',
        }
    ],
    preview: {
        select: {
            title: 'content',
            media: 'image'
        },
    }
})