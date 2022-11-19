import { defineType } from "sanity";

export default defineType({
    title: 'Background Options',
    name: 'backgroundOptions',
    type: 'object',
    fields: [
        {
            title: 'Background image or color',
            name: 'background',
            type: 'imageColor',
        },
        {
            title: 'Text Color',
            name: 'textColor',
            type: 'textColor',
        },
    ]
})