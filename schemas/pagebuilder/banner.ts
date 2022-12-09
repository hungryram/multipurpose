import { defineType } from "sanity";

export default defineType({
    title: 'Banner',
    name: 'banner',
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
            title: 'Text',
            name: 'content',
            type: 'contentEditor',
            group: 'content'
        },
        {
            title: 'Two Column',
            name: 'twoColumn',
            type: 'boolean',
            group: 'settings',
        },
        {
            title: 'Primary Button',
            name: 'button',
            type: 'buttonSettings',
            group: 'content'
        },
        {
            title: 'Secondary Button',
            name: 'secondaryButton',
            type: 'secondaryButton',
            group: 'content'
        },
        {
            title: 'Background Options',
            name: 'background',
            group: 'settings',
            type: 'backgroundOptions',
        }
    ]
})