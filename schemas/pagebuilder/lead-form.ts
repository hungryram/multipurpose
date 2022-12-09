import { defineType } from "sanity";

export default defineType({
    title: 'Lead Form',
    name: 'leadForm',
    type: 'object',
    groups: [
        {title: 'Content', name: 'content'},
        {title: 'Settings', name: 'settings'},
    ],
    fields: [
        {
            title: 'Heading',
            name: 'heading',
            type: 'string',
            group: 'content'
        },
        {
            title: 'Content',
            name: 'content',
            type: 'contentEditor',
            group: 'content'
        },
        {
            title: 'Button',
            name: 'button',
            type: 'buttonSettings',
            group: 'content'
        },
        {
            title: 'Padding Sizing',
            name: 'paddingSizing',
            type: 'string',
            options: {
                list: [
                    {title: 'Default', value: 'default'},
                    {title: 'Large', value: 'large'},
                ]
            },
            group: 'settings'
        },
        {
            title: 'Background Options',
            name: 'background',
            group: 'settings',
            type: 'backgroundOptions',
        },
        {
            title: 'Form Background',
            name: 'secondaryBackground',
            group: 'settings',
            type: 'color',
        },
        {
            title: 'Form Text Color',
            name: 'formTextColor',
            group: 'settings',
            type: 'color',
        }
    ]
})