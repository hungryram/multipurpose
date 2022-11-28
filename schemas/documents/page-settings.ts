import { defineType } from "sanity";

export default defineType({
    title: 'Page Settings',
    name: 'pageSetting',
    type: 'document',
    fields: [
        {
            title: 'Blog',
            name: 'blog',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: true,
            },
            fields: [
                {
                    title: 'Title',
                    name: 'title',
                    type: 'string'
                },
                {
                    title: 'Header Image',
                    name: 'headerImage',
                    type: 'image',
                    options: {
                        hotspot: true
                    }
                },
                {
                    title: 'Search Engine Optimization',
                    name: 'seo',
                    type: 'seo'
                }
            ]
        },
        {
            title: 'Services',
            name: 'services',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: true,
            },
            fields: [
                {
                    title: 'Title',
                    name: 'title',
                    type: 'string'
                },
                {
                    title: 'Header Image',
                    name: 'headerImage',
                    type: 'image',
                    options: {
                        hotspot: true
                    }
                },
                {
                    title: 'Search Engine Optimization',
                    name: 'seo',
                    type: 'seo'
                }
            ]
        },
        {
            title: 'Legal',
            name: 'legal',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: true,
            },
            fields: [
                {
                    title: 'Title',
                    name: 'title',
                    type: 'string'
                },
                {
                    title: 'Header Image',
                    name: 'headerImage',
                    type: 'image',
                    options: {
                        hotspot: true
                    }
                },
                {
                    title: 'Search Engine Optimization',
                    name: 'seo',
                    type: 'seo'
                }
            ]
        },
    ],
    preview: {
        prepare(){
            return {
                title: 'Page Settings'
            }
        }
    }
})