import { defineType } from "sanity";

export default defineType({
    title: 'Icon Section',
    name: 'iconSection',
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
            type: 'contentEditor',
            group: 'content'
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
            title: 'Blocks',
            name: 'blocks',
            type: 'array',
            group: 'content',
            of: [
                {
                    title: 'Blocks',
                    type: 'object',
                    fields: [
                        {
                            title: 'Icon SVG',
                            name: 'iconSvg',
                            type: 'text'
                        },
                        {
                            title: 'Image',
                            name: 'image',
                            type: 'image'
                        },
                        {
                            title: 'Heading',
                            name: 'heading',
                            type: 'string'
                        },
                        {
                            title: 'Content',
                            name: 'content',
                            type: 'text',
                        },
                        {
                            title: 'Button',
                            name: 'button',
                            type: 'links',
                        },
                    ]
                }
            ]
        },
        {
            title: 'Block Text Left',
            name: 'blockLeft',
            type: 'boolean',
            group: 'settings'
        },
        {
            title: 'Remove Padding',
            name: 'removePadding',
            type: 'boolean',
            group: 'settings',
        },
        {
            title: 'Content Text Left',
            name: 'textLeft',
            type: 'boolean',
            group: 'settings',
        },
        {
            title: 'Number of Columns',
            name: 'columnNumber',
            type: 'number',
            validation: Rule => Rule.min(2).max(4),
            group: 'settings'
        },
        {
            title: 'Background Options',
            name: 'background',
            group: 'settings',
            type: 'backgroundOptions',
        }
    ]
})