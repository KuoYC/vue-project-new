// mixins/fileMixin.js

export const fileMixin = {
    methods: {
        handleFilesSelected(files, type) {
            const propertyMap = {
                'meeting': 'filMeetingFiles',
                'plan': 'filPlanFiles',
                'other': 'filOtherFiles',
            };
            this[propertyMap[type]] = files;
        },
    },
};
