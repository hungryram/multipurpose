import { defineType } from "sanity";
import { GoLocation } from 'react-icons/go'

export default defineType({
    title: 'Locations',
    name: 'locations',
    type: 'document',
    icon: GoLocation,
    groups: [
        {title: 'Content', name: 'content'},
        {title: 'SEO', name: 'seo'},
        {title: 'Settings', name: 'settings'},
    ],
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            group: 'content',
            validation: Rule => Rule.required().error('Add a title')
        },
        {
            title: 'URL',
            name: 'slug',
            type: 'slug',
            group: 'settings',
            description: 'We recommend clicking generate. Changing URL may cause broken pages',
            options: {
              source: "name",
            },
        },
        {
            title: 'Image',
            name: 'image',
            type: 'image',
            group: 'content',
        },
        {
            title: 'Position',
            name: 'position',
            type: 'string',
            group: 'content',

        },
        {
            title: 'Contact Information',
            name: 'contactInformation',
            type: 'object',
            group: 'content',
            options: {
                collapsible: true,
                collapsed: true,
            },
            fields: [
                {
                    title: 'Phone Number',
                    name: 'phoneNumber',
                    type: 'string',
                },
                {
                    title: 'Email',
                    name: 'email',
                    type: 'string'
                },
                {
                    title: 'Website Link',
                    name: 'websiteLink',
                    type: 'url'
                }
            ]
        },
        {
            title: 'Social Accounts',
            name: 'socialAccounts',
            type: 'social',
            group: 'content',
        },
        {
            title: 'About',
            name: 'about',
            type: 'contentEditor'
        },
        {
            title: 'Search Engine Optimization',
            name: 'seo',
            type: 'seo',
            group: 'seo'
        }
    ]
})