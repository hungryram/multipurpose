import { defineType } from "sanity";

export default defineType({
    title: 'Banner',
    name: 'banner',
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
            title: 'Text',
            name: 'text',
            type: 'text',
            group: 'content'
        },
        {
            title: 'Full Width',
            name: 'fullWidth',
            type: 'boolean',
            group: 'settings',
        },
        {
            title: 'Two Column',
            name: 'twoColumn',
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
            title: 'Button',
            name: 'button',
            type: 'object',
            group: ['settings', 'content'],
            options: {
                collapsible: true,
                collapsed: true
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
                    type: 'string',
                },
                {
                    title: 'Button Background Color',
                    name: 'buttonBackground',
                    type: 'color',
                },
                {
                    title: 'Button Text Color',
                    name: 'buttonTextColor',
                    type: 'color',
                }
            ]
        },
        {
            title: 'Background image or color',
            name: 'background',
            type: 'imageColor',
            group: 'settings',
        },
        {
            title: 'Text Color',
            name: 'textColor',
            type: 'textColor',
            group: 'settings',
        },
    ]
})