import { defineType } from "sanity";

export default defineType({
    title: 'Pricing',
    name: 'pricing',
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
            group: 'content',
            type: 'contentEditor'
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
            title: 'Packages',
            name: 'blocks',
            type: 'array',
            group: 'content',
            of: [
                {
                    title: 'Package',
                    type: 'object',
                    fields: [
                        {
                            title: 'Name',
                            name: 'name',
                            type: 'string'
                        },
                        {
                            title: 'Price',
                            name: 'price',
                            type: 'string'
                        },
                        {
                            title: 'Package Type',
                            name: 'packageType',
                            type: 'string',
                            description: 'Displays after the pricing. identify if monthly, annually, etc.'
                        },
                        {
                            title: 'Content',
                            name: 'content',
                            type: 'text',
                        },
                        {
                            title: 'Link',
                            name: 'button',
                            type: 'links',
                        },
                        {
                            title: 'Details',
                            name: 'details',
                            type: 'array',
                            of: [{
                                type: 'string'
                            }]
                        }
                    ]
                }
            ]
        },
        {
            title: 'Number of Columns',
            name: 'columnNumber',
            type: 'number',
            validation: Rule => Rule.min(1).max(4),
            group: 'settings'
        },
        {
            title: 'Background Options',
            name: 'background',
            type: 'backgroundOptions',
            group: 'settings'
        },
        {
            title: 'Pricing Background',
            name: 'secondaryBackground',
            group: 'settings',
            type: 'color',
        },
    ]
})