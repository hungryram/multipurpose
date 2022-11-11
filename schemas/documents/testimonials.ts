import { defineType } from "sanity";
import { AiOutlineComment } from 'react-icons/ai'

export default defineType({
    title: 'Testimonials',
    name: 'testimonials',
    type: 'document',
    icon: AiOutlineComment,
    fields: [
        {
            title: 'Testimonial',
            name: 'testimonial',
            type: 'contentEditor',
        },
        {
            title: 'Name',
            name: 'name',
            type: 'string'
        }
    ]
})