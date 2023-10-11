// mixins/memberMixin.js

export const memberMixin = {
    methods: {
        createMemberData(memType, memBu1Code) {
            const memberData = {
                uniqueId: this.$root.generateUniqueId(),
                memId: '0',
                memType: memType,
                memBu1Code: memBu1Code,
                memBu2Code: '',
                memBu2: '',
                memBu3Code: '',
                memBu3: '',
                memLV0Key: '',
                memLV0Name: '',
                memLV0PositionName: '',
                memLVCKey: '',
                memLVCName: '',
                memLVCPositionName: '',
                memLV1Key: '',
                memLV1Name: '',
                memLV1PositionName: '',
                memLV2Key: '',
                memLV2Name: '',
                memLV2PositionName: '',
                memPhone: '',
            };
            return memberData;
        },
        addMember(type, Bu1Code) {
            switch (type) {
                case 'M':
                    this.mMemberData.push(
                        this.createMemberData('1', Bu1Code),
                    );
                    break;
                case 'U':
                    this.uMemberData.push(
                        this.createMemberData('2', ''),
                    );
                    break;
            }
        },
        removeMember(uniqueId, type) {
            let memberDataArray = [];
            switch (type) {
                case 'M':
                    memberDataArray = this.mMemberData;
                    break;
                case 'U':
                    memberDataArray = this.uMemberData;
                    break;
            }
            const index = memberDataArray.findIndex(item => item.uniqueId === uniqueId);
            if (index !== -1) {
                memberDataArray.splice(index, 1);
            }
        },
    },
};
