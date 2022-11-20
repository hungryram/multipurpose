import { defineType } from "sanity";

export default defineType({
    title: 'Pricing',
    name: 'pricing',
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
            type: 'contentEditor'
        },
        {
            title: 'Button',
            name: 'button',
            type: 'buttonSettings',
        },
        {
            title: 'Packages',
            name: 'packages',
            type: 'array',
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
                            title: 'Button Text',
                            name: 'buttonText',
                            type: 'string',
                        },
                        {
                            title: 'Link',
                            name: 'link',
                            type: 'string',
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
        },
        {
            title: 'Background Options',
            name: 'background',
            type: 'backgroundOptions',
        },
    ]
})