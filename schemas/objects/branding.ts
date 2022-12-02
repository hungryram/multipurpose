import { defineType } from "sanity";

export default defineType({
    name: 'branding',
    title: 'Branding',
    type: 'object',
    options: {
        collapsible: true,
        collapsed: true,
    },
    fields: [
        {
            title: 'Logo',
            name: 'logo',
            type: 'image'
        },
        {   
            title: 'Logo Width',
            name: 'logoWidth',
            type: 'number'
        },
        {   
            title: 'Mobile Logo Width',
            name: 'mobileLogoWidth',
            type: 'number'
        },
        {
            title: 'Loading Screen Logo',
            name: 'loadingLogo',
            type: 'image'
        },
        {
            title: 'Loading Background Color',
            name: 'loadingBackground',
            type: 'color',
            options: {
                disableAlpha: true
            },
        },
        {
            title: 'Favicon',
            name: 'favicon',
            type: 'image'
        },
    ]
})