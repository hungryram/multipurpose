import { defineType } from "sanity";

export default defineType({
    title: 'Links',
    name: 'links',
    type: 'object',
    fields: [
        {
            title: "Text",
            name: "text",
            type: "string",
            validation: Rule => Rule.required().error('Name your item'),
        },
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
                { type: 'post' },
                { type: 'author' },
                { type: 'pages' },
                { type: 'locations' },
                { type: 'partners' }
            ],
        },
        {
            name: 'externalUrl',
            title: 'External URL',
            description: "Use this field to link to an external website",
            hidden: ({ parent }) => parent?.linkType !== "external", // hidden if link type is not external
            type: 'string',
        },
        {
            name: 'newTab',
            title: 'Open in new tab',
            hidden: ({ parent }) => parent?.linkType !== "external", // hidden if link type is not external
            type: 'boolean',
        },
    ]
})