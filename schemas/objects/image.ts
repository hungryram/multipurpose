import { defineType } from "sanity";

export default defineType({
    title: 'Image',
    name: 'photo',
    type: 'object',
    fields: [
        {
            title: 'Image',
            name: 'image',
            type: 'image'
        }
    ],
    preview: {
        select: {
            media: 'image'
        }
    }
})