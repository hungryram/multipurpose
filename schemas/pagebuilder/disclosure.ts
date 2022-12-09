import { defineType } from "sanity";

export default defineType({
    title: 'Disclosure Section',
    name: 'disclosureSection',
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
            group: 'content',
            type: 'contentEditor',
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
            title: 'Disclosures',
            name: 'disclosures',
            group: 'content',
            type: 'array',
            description: 'This section works best for drop downs, like a brief FAQ.',
            of: [
                {
                    title: 'Disclosure Block',
                    name: 'disclosureBlock',
                    type: 'object',
                    fields: [
                        {
                            title: 'Heading',
                            name: 'heading',
                            type: 'string'
                        },
                        {
                            title: 'Content',
                            name: 'content',
                            type: 'contentEditor'
                        }
                    ]
                }
            ]
        },
        {
            title: 'Two Column',
            name: 'twoColumn',
            type: 'boolean',
            group: 'settings'
        },
        {
            title: 'Text Left',
            name: 'textLeft',
            type: 'boolean',
            group: 'settings'
        },
        {
            title: 'Disclosure Background Color',
            name: 'disclosureBackgroundColor',
            type: 'color',
            options: {
                disableAlpha: true
            },
            group: 'settings'
        },
        {
            title: 'Disclosure Header Color',
            name: 'disclosureTextColor',
            type: 'color',
            options: {
                disableAlpha: true
            },
            group: 'settings'
        },
        {
            title: 'Disclosure Content Color',
            name: 'disclosureContentColor',
            type: 'color',
            options: {
                disableAlpha: true
            },
            group: 'settings'
        },
        {
            title: 'Background Options',
            name: 'background',
            group: 'settings',
            type: 'backgroundOptions',
        }
    ],
    preview: {
        select: {
            title: 'content',
            subtitle: 'disclosures.disclosureBlock'
        },
    }
})