import { defineType } from "sanity";

export default defineType({
    title: 'Home',
    name: 'homeDesign',
    type: 'document',
    fields: [
        {
            title: 'Page Builder',
            name: 'pageBuilder',
            type: 'array',
            of: [
                {type: 'hero'},
            ]
        }
    ]
})
