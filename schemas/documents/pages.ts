import { defineType } from "sanity";

export default defineType({
    title: 'Pages',
    name: 'pages',
    type: 'document',
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
            fields: [
                {
                    title: 'Hide Header',
                    name: 'hideHeader',
                    type: 'boolean'
                }
            ]
        },
        {
            title: 'Page Builder',
            name: 'pageBuilder',
            type: 'array',
            group: 'content',
            of: [
                {type: 'hero'},
                {type: 'textandImage'},
                {type: 'featuredGrid'},
                {type: 'banner'},
                {type: 'disclosureSection'},
                {type: 'contactPage'},
                {type: 'codeBlock'},
            ]
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
