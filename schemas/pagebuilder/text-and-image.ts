import { defineType } from "sanity";

export default defineType({
    title: 'Text and Image',
    name: 'textandImage',
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
            group: 'content'
        },
        {
            title: 'Button',
            name: 'button',
            type: 'object',
            group: 'content',
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
            ]
        },
        {
            title: 'Image',
            name: 'image',
            type: 'image',
            options: {
                hotspot: true
            },
        },
        {
            title: 'Reverse Column',
            name: 'reverseRow',
            type: 'boolean',
            description: 'Enable this to make sections staggered',
            group: 'settings'
        },
        {
            title: 'Text Left',
            name: 'textLeft',
            type: 'boolean',
            description: 'Defaults to center when no image is set',
            group: 'settings'
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
            title: 'heading',
            subtitle: 'content',
            media: 'image'
        }
    },
    
})