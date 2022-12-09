import { defineType } from "sanity";

export default defineType({
    title: 'Pages',
    name: 'pages',
    type: 'document',
    groups: [
        {name: 'content', title: 'Content'},
        {name: 'settings', title: 'Settings'},
      ],
    fields: [
        
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            group: 'content'
        },
        {
            title: 'URL',
            name: 'slug',
            type: 'slug',
            description: 'We recommend clicking generate. Changing URL may cause broken pages',
            options: {
              source: "title",
            },
            group: 'settings',
            validation: (Rule) => Rule.required(),
        },
        {
            title: 'Header Image',
            name: 'headerImage',
            type: 'image',
            group: 'content',
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
                {type: 'iconSection'},
                {type: 'banner'},
                {type: 'logos'},
                {type: 'testimonialBuilder'},
                {type: 'disclosureSection'},
                {type: 'teamDisplay'},
                {type: 'blogDisplay'},
                {type: 'servicesDisplay'},
                {type: 'gallery'},
                {type: 'fullWidthTextImage'},
                {type: 'leadForm'},
                {type: 'pricing'},
                {type: 'codeBlock'},
                {type: 'contactPage'},
            ]
        },
        {
            title: 'Search Engine Optimization',
            description: 'Not needed if page is set to be the home page',
            name: 'seo',
            type: 'seo',
            group: 'settings'
        }
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'slug.current',
            media: 'headerImage'
        },
        prepare(selection) {
            const { title, subtitle, media } = selection
            return {
                title: title,
                media: media
                
            }
        }
    }
})
