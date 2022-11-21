import { defineType } from "sanity";

export default defineType({
    title: 'Text Color',
    name: 'textColor',
    type: 'object',
    options: {
        collapsible: true,
        collapsed: true,
    },
    fields: [
        {
            title: 'Heading Color',
            name: 'headerColor',
            type: 'color',
            options: {
                disableAlpha: true
            }
        },
        {
            title: 'Text Color',
            name: 'textColor',
            type: 'color',
            options: {
                disableAlpha: true
            }
        }
    ]
})