
export default {
    name: 'profile',
    title: 'Profile Settings',
    type: 'document',
    groups: [
        {title: 'Contact Information', name: 'contact'},
        {title: 'Settings', name: 'settings'},
    ],
    fields: [
        {
            title: 'Company Name',
            name: 'company_name',
            type: 'string',
            group: 'contact',
        },
        {
            title: 'Contact Information',
            name: 'contact_information',
            type: 'contact',
            group: 'contact'

        },
        {
            title: 'Address',
            name: 'address',
            type: 'location',
            group: 'contact'

        },
        {
            title: 'Social',
            name: 'social',
            type: 'social',
            group: 'contact'

        },
        {
            name: 'seo',
            title: 'Search Engine Optimization',
            type: 'object',
            group: 'settings',
            options: {
                collapsible: true,
                collapsed: true,
            },
            fields: [
                {
                    title: 'Title Tag',
                    name: 'title_tag',
                    type: 'string'
                },
                {
                    title: 'Meta Description',
                    name: 'meta_description',
                    type: 'text'
                },
                {
                    title: 'Twitter Username',
                    name: 'twitterHandle',
                    type: 'string'
                },
                {
                    title: 'Default Image Banner',
                    name: 'defaultImageBanner',
                    type: 'image',
                    description: 'Banner used when sharing your website link'
                },
            ]
        },
        {
            title: 'Hours',
            name: 'hours',
            group: 'settings',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: true,
            },
            fields: [
                {
                    title: 'Monday',
                    name: 'monday',
                    type: 'string',
                },
                {
                    title: 'Tuesday',
                    name: 'tuesday',
                    type: 'string',
                },
                {
                    title: 'Wednesday',
                    name: 'wednesday',
                    type: 'string',
                },
                {
                    title: 'Thursday',
                    name: 'thursday',
                    type: 'string',
                },
                {
                    title: 'Friday',
                    name: 'friday',
                    type: 'string',
                },
                {
                    title: 'Saturday',
                    name: 'saturday',
                    type: 'string',
                },
                {
                    title: 'Sunday',
                    name: 'sunday',
                    type: 'string',
                },
            ]
        },
        {
            title: 'Settings',
            name: 'settings',
            type: 'object',
            group: 'settings',
            options: {
                collapsible: true,
                collapsed: true
            },
            fields: [
                {
                    title: 'Website domain',
                    name: 'websiteName',
                    type: 'url',
                    description: 'Must include the full URL',
                    validation: Rule => Rule.required().error('Needed for website configuration')
                },
                {
                    title: 'Email Alerts',
                    name: 'emailAlerts',
                    type: 'string',
                    description: 'Enter in the email to receive email alerts. Separate multiple emails with commas.'
                },
                {
                    title: 'Email CC',
                    name: 'emailCc',
                    type: 'string',
                },
                {
                    title: 'Email Bcc',
                    name: 'emailBcc',
                    type: 'string',
                },
                {
                    title: 'Send From',
                    name: 'sendFrom',
                    type: 'string',
                },
                {
                    title: 'Google Analytics ID',
                    name: 'googleID',
                    type: 'string',
                    description: 'Only include the Google ID, not the code. Ex. G-4XXXXXXX'
                },
                {
                    title: 'Facebook Pixel ID',
                    name: 'facebookPixel',
                    type: 'string',
                    description: 'Only include the facebook pixel ID, not the code. This is also the business ID'
                }, 
            ]
        }
    ],
    preview: {
        prepare(){
            return {
                title: 'Profile Settings'
            }
        }
    }
}