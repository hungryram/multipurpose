import { defineType } from "sanity";

export default defineType({
    title: 'Featured Grid',
    name: 'featuredGrid',
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
                            title: 'Heading',
                            name: 'value',
                            type: 'string'
                        },
                        {
                            title: 'Content',
                            name: 'content',
                            type: 'text',
                            validation: Rule => Rule.error('Keep it short and brief, under 150 characters').max(150)
                        },
                        {
                            title: 'Image',
                            name: 'image',
                            type: 'image',
                        },
                        {
                            title: 'Button',
                            name: 'button',
                            type: 'links',
                        },
                        {
                            title: 'Border Color',
                            name: 'borderColor',
                            type: 'color',
                        },
                        {
                            title: 'Background Color',
                            name: 'backgroundcolor',
                            type: 'color',
                        },
                        {
                            title: 'Text Color',
                            name: 'textColor',
                            type: 'color',
                        }
                    ]
                }
            ]
        },
        {
            title: 'Two Column',
            name: 'twoColumn',
            type: 'boolean',
            group: 'settings',
            description: 'Change layout to two columns'
        },
        {
            title: 'Full Width',
            name: 'fullWidth',
            type: 'boolean',
            group: 'settings',
        },
        {
            title: 'Remove Gap Between Images',
            name: 'removeGap',
            type: 'boolean',
            group: 'settings',
        },
        {
            title: 'Text Outside Image',
            name: 'textOutsideImage',
            type: 'boolean',
            group: 'settings',
            description: 'Disabling will apply dark overlay on images'
        },
        {
            title: 'Block Text Left',
            name: 'blockLeft',
            type: 'boolean',
            group: 'settings'
        },
        {
            title: 'Center Text in Grid',
            name: 'centerTextGrid',
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
            title: 'Content Text Left',
            name: 'textLeft',
            type: 'boolean',
            group: 'settings',
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