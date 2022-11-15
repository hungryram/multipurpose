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
                            title: 'Name',
                            name: 'value',
                            type: 'string'
                        },
                        {
                            title: 'Content',
                            name: 'content',
                            type: 'text'
                        },
                        {
                            title: 'Image',
                            name: 'image',
                            type: 'image',
                            options: {
                                hotspot: true
                            }
                        },
                        {
                            title: 'Link',
                            name: 'link',
                            type: 'string'
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
            group: 'settings'
        },
        {
            title: 'Header Text Left',
            name: 'headerLeft',
            type: 'boolean',
            group: 'settings'
        },
        {
            title: 'Center Text in Grid',
            name: 'centerTextGrid',
            type: 'boolean',
            group: 'settings',
            hidden: ({ parent, value }) => !value && parent?.textLeft

        },
        {
            title: 'Text Left',
            name: 'textLeft',
            type: 'boolean',
            group: 'settings',
            hidden: ({ parent, value }) => !value && parent?.centerTextGrid
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
            title: 'Background image or color',
            name: 'background',
            type: 'imageColor',
            group: 'settings'
        },
        {
            title: 'Text Color',
            name: 'textColor',
            type: 'textColor',
            group: 'settings'
        },
    ]
})