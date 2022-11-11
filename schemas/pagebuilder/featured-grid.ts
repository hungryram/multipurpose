import { defineType } from "sanity";

export default defineType({
    title: 'Featured Grid',
    name: 'featuredGrid',
    type: 'object',
    fields: [
        {
            title: 'Heading',
            name: 'heading',
            type: 'string'
        },
        {
            title: 'Text',
            name: 'text',
            type: 'contentEditor',
        },
        {
            title: 'Blocks',
            name: 'blocks',
            type: 'array',
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
                        }
                    ]
                }
            ]
        },
        {
            title: 'Background image or color',
            name: 'background',
            type: 'imageColor'
        },
        {
            title: 'Text Color',
            name: 'textColor',
            type: 'textColor',
        },
    ]
})