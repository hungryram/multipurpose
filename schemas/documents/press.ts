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
            type: 'text',
            description: 'Press is a page block within the page builder. Choose the press block in a page builder to display the presses'
        },
        {
            title: 'Press Link',
            name: 'pressLink',
            type: 'url',
            description: 'URL to the press article'
        }
    ],
    preview: {
        select: {
            title: 'pressTitle',
            subtitle: 'pressLink'
        }
    }
})