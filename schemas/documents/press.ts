import { defineType } from "sanity";
import { BsNewspaper } from "react-icons/bs"

export default defineType({
    title: 'Press',
    name: 'press',
    type: 'document',
    icon: BsNewspaper,
    fields: [
        {
            title: 'Press Title',
            name: 'pressTitle',
            type: 'string'
        },
        {
            title: 'Description',
            name: 'description',
            type: 'text'
        },
        {
            title: 'Press Link',
            name: 'pressLink',
            type: 'url',
            description: 'URL to the press article'
        }
    ]
})