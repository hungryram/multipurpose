import { defineType } from "sanity";

export default defineType({
    title: 'Hero',
    name: 'hero',
    type: 'object',
    groups: [
        {name: 'content', title: 'Content'},
        {name: 'settings', title: 'Settings'},
    ],
    fields: [
        {
            title: 'Content',
            name: 'content',
            type: 'contentEditor',
            group: 'content'
        },
        {
            title: 'Image',
            name: 'image',
            type: 'image',
            group: 'content',
            options: {
                hotspot: true
            }
        },
        {
            title: 'Image Height',
            name: 'imageHeight',
            type: 'string',
            options: {
                list: [
                    {title: 'Small', value: 'small'},
                    {title: 'Medium', value: 'medium'},
                    {title: 'Large', value: 'large'},
                ]
            },
            group: 'settings'
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
            title: 'Text Color',
            name: 'textColor',
            type: 'textColor',
            group: 'settings',
            options: {
                disableAlpha: true
            }
        },

    ],
    preview: {
        select: {
            title: 'content',
            media: 'image'
        }
    }
})