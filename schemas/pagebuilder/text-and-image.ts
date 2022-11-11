import { defineType } from "sanity";

export default defineType({
    title: 'Text and Image',
    name: 'textandImage',
    type: 'object',
    fields: [
        {
            title: 'Heading',
            name: 'heading',
            type: 'string',
        },
        {
            title: 'Content',
            name: 'content',
            type: 'contentEditor',
        },
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
            title: 'Reverse Row',
            name: 'reverseRow',
            type: 'boolean',
            description: 'Enable this to make sections staggered'
        },
        {
            title: 'Image',
            name: 'image',
            type: 'image',
            options: {
                hotspot: true
            },
            fields: [
                {
                    title: 'Alt Tag',
                    name: 'altTag',
                    type: 'string',
                    description: 'Describe your image'
                }
            ]
        },
        {
            title: 'Background image or color',
            name: 'background',
            type: 'imageColor'
        },
        {
            title: 'Text Color',
            name: 'textColor',
            type: 'textColor',
        },
    ],
    preview: {
        select: {
            title: 'heading',
            media: 'image'
        }
    }
})