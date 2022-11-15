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
            title: 'Heading',
            name: 'heading',
            type: 'string',
            group: 'content'
        },
        {
            title: 'Subtitle',
            name: 'subtitle',
            type: 'text',
            group: 'content'
        },
        {
            title: 'Image',
            name: 'image',
            type: 'image',
            group: 'content',
            options: {
                hotspot: true,
            },
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
            title: 'Text Color',
            name: 'textColor',
            type: 'textColor',
            group: 'settings'
        },
        {
            title: 'Button',
            name: 'button',
            type: 'object',
            group: 'content',
            options: {
                collapsible: true,
                collapsed: true,
            },
            fields: [
                {
                    title: 'Button Text',
                    name: 'buttonText',
                    type: 'string',
                },
                {
                    title: 'Button Link',
                    name: 'buttonLink',
                    type: 'string'
                }
            ]
        }
    ]
})