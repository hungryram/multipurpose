import { defineType } from "sanity";

export default defineType({
    name: 'appearances',
    title: 'Appearance',
    type: 'document',
    fields: [
        {
            title: 'Branding',
            name: 'branding',
            type: 'branding'
        },
        {
            title: 'Header',
            name: 'header',
            type: 'headerMenu'
        },
        {
            title: 'Colors',
            name: 'mainColors',
            type: 'mainColors'
        },
        {
            title: 'Footer',
            name: 'footer',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: true
            },
            fields: [
                {
                    title: 'Footer Logo',
                    name: 'footerLogo',
                    type: 'image'
                },
                {
                    title: 'Footer Text',
                    name: 'footerText',
                    type: 'contentEditor',
                    description: 'Perfect for a brief bio'
                },
                {
                    title: 'Footer Disclaimer',
                    name: 'footerDisclaimer',
                    type: 'contentEditor'
                },
                {
                    title: "Quick links",
                    name: "quickLinks",
                    type: "array",
                    of: [{ type: "navigationItem" }]
                },
                {
                    title: 'Footer Background Color',
                    name: 'footerBackgroundColor',
                    type: 'color',
                },
                {
                    title: 'Header Color',
                    name: 'headerColor',
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
})