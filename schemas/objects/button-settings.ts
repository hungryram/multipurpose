import { defineType } from "sanity";

export default defineType({
        title: 'Button Settings',
        name: 'buttonSettings',
        type: 'object',
        options: {
            collapsible: true,
            collapsed: true
        },
        fields: [
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
                title: 'Button Background Color',
                name: 'buttonBackground',
                type: 'color',
            },
            {
                title: 'Button Text Color',
                name: 'buttonTextColor',
                type: 'color',
            }
        ]
})