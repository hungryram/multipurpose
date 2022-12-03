import { defineType } from "sanity";

export default defineType({
    title: 'Link',
    name: 'editorLink',
    type: 'object',
    fields: [
        {
            title: "Select the type of link",
            name: "linkType",
            type: "string",
            options: {
                list: [
                    { title: "Internal", value: "internal" },
                    { title: "External", value: "external" },
                ],
                layout: "radio",
            },
        },
        {
            title: 'Website Link',
            name: 'internalLink',
            description: 'Select pages for navigation',
            type: 'reference',
            hidden: ({ parent }) => parent?.linkType !== "internal",
            to: [
                { type: 'blog' },
                { type: 'author' },
                { type: 'pages' },
                { type: 'location' },
                { type: 'services' },
            ],
        },
        {
            name: 'externalUrl',
            title: 'External URL',
            description: "Use this field to link to an external website or paste URL",
            hidden: ({ parent }) => parent?.linkType !== "external",
            type: 'string',
        },
        {
            name: 'newTab',
            title: 'Open in new tab',
            type: 'boolean',
        },
    ]
})