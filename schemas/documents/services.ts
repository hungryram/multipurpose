import { defineType } from "sanity";
import { BsBriefcase } from "react-icons/bs"

export default defineType({
    title: 'Services',
    name: 'services',
    type: 'document',
    icon: BsBriefcase,
    groups: [
        {name: 'content', title: 'Content'},
        {name: 'settings', title: 'Settings'},
        {name: 'seo', title: 'SEO'},
      ],
    fields: [
        
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            group: 'settings'
        },
        {
            title: 'URL',
            name: 'slug',
            type: 'slug',
            description: 'We recommend clicking generate. Changing URL may cause broken pages',
            options: {
              source: "title",
            },
            group: 'settings'
        },
        {
            title: 'Header Image',
            name: 'headerImage',
            type: 'image',
            group: 'settings',
            options: {
                hotspot: true
            },
        },
        {
            title: 'Content',
            name: 'content',
            type: 'contentEditor'
        },
        {
            title: 'Search Engine Optimization',
            name: 'seo',
            type: 'seo',
            validation: Rule => Rule.required().error('Required for search engines'),
            group: 'seo'
        }
    ]
})