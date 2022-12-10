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
            title: 'Image',
            name: 'image',
            type: 'image',
            group: 'content',
            fields: [
                {
                    title: 'Image Width',
                    name: 'imageWidth',
                    type: 'number'
                }
            ]
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
            title: 'Two Column Text',
            name: 'twoColumnText',
            type: 'boolean',
            description: 'Split content into two columns',
            group: 'settings'
        },
        {
            title: 'Remove Padding',
            name: 'removePadding',
            type: 'boolean',
            group: 'settings'
        },
        {
            title: 'Remove Image Shadow',
            name: 'removeShadow',
            type: 'boolean',
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