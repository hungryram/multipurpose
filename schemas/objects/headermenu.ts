import { defineType } from "sanity";

export default defineType({
        title: 'Header Menu',
    name: 'headerMenu',
    type: 'object',
    options: {
        collapsible: true,
        collapsed: true,

    },
    fields: [
        {
            title: 'Main navigation',
            name: 'mainNav',
            description: 'Select menu for main navigation',
            type: 'reference',
            to: { type: 'navigation' },
        },
        {
            name: 'headerColor',
            title: 'Header Color',
            type: 'color'
        },
        {
            name: 'navColor',
            title: 'Navigation Text Color',
            type: 'color'
        },
        {
            name: 'hamburgerMenuColor',
            title: 'Mobile Menu Icon Color',
            type: 'color'
        },
        {
            title: "Call to Action",
            name: "cta",
            type: "subMenu",
        },
        {
            title: 'Default Page Header Image',
            name: 'defaultHeaderImage',
            type: 'image',
            options: {
                hotspot: true
            }
        },
    ]
})