// mixins/signMixin.js
import dayjs from 'dayjs';

export const signMixin = {
    methods: {
        // 發起簽核 releaseSign useType 0=conId, 1=addId
        async releaseSign(conId, appId, useType) {
            // 文件發起人必須與登入人資料一致
            if (this.iMemberData.comId === this.per.comId && this.iMemberData.memLV0Key === this.per.perKey) {
                try {
                    await this.goDefaultSet(useType);//重置簽核人員資料
                    let log = this.createSignLog(conId, appId, 0, this.per.perKey, 3, '發起', 1);
                    await this.goUpdateStatus(conId, 1, null, log, useType);//修改狀態為進行中
                    const upMember = this.createUpMember(conId, appId, this.iMemberData, '0', 3, true);
                    await this.updateMember(upMember);//修改簽核組別資訊
                    alert('發起成功');
                    this.$router.go(0);

                } catch (error) {
                    console.error('Edit failed:', error);
                }
            }
            else {
                alert('您並非發起人');
            }
        },
        // 簽核作業 signContract useType 0=conId, 1=addId
        async signContract(conId, appId, useType) {
            let iMemberEnd = false;//維運平行簽核
            let upMember = null;
            if (this.iMemberData.comId === this.per.comId && (this.iMemberData.memNowKey === this.per.perKey || (this.iMemberData.memNowKey === '' && this.iMemberData.memLVCKey === '' && this.contactData.some(contact => contact.perKey.includes(this.per.perKey))))) {
                const isLV = this.getMemberLV(this.iMemberData);
                if (isLV) {
                    upMember = this.createUpMember(conId, appId, this.iMemberData, isLV, 3, true);
                    if (isLV === '2') {
                        iMemberEnd = true;
                    }
                }
            }
            let mMemberEnd = false;
            this.mMemberData.forEach((mem) => {
                if (mem.comId === this.per.comId && mem.memNowKey === this.per.perKey) {
                    const isLV = this.getMemberLV(mem);
                    if (isLV) {
                        upMember = this.createUpMember(conId, appId, mem, isLV, 3, false);
                        if (isLV === '2') {
                            mMemberEnd = true;
                        }
                    }
                }
            });

            let uMemberEnd = false;
            this.uMemberData.forEach((mem) => {
                if (mem.comId === this.per.comId && mem.memNowKey === this.per.perKey) {
                    const isLV = this.getMemberLV(mem);
                    if (isLV) {
                        upMember = this.createUpMember(conId, appId, mem, isLV, 3, false);
                        if (isLV === '2') {
                            uMemberEnd = true;
                        }
                    }
                }
            });
            if (upMember) {
                try {
                    await this.updateMember(upMember);
                    if (iMemberEnd) {
                        if (this.mMemberData.length > 0) {
                            await this.mMemberData.forEach(mem=>{
                                upMember = this.createUpMember(conId, appId, mem, '0', 0, false);
                                try {
                                    this.updateMember(upMember);
                                } catch (error) {
                                    console.error('Edit failed:', error);
                                }
                            });
                            alert('簽核完成');
                            this.$router.go(0);
                        }
                        else if (this.uMemberData.length > 0) {
                            await this.uMemberData.forEach(mem=>{
                                upMember = this.createUpMember(conId, appId, mem, '0', 0, false);
                                try {
                                    this.updateMember(upMember);
                                } catch (error) {
                                    console.error('Edit failed:', error);
                                }
                            });
                            alert('簽核完成');
                            this.$router.go(0);
                        }
                        else {
                            try {
                                let log = this.createSignLog(conId, appId, 0, '', 3, '文件簽核完成', 3);
                                await this.goUpdateStatus(conId, 3, dayjs().format('YYYY-MM-DD'), log, useType);
                                await this.clearMemberAll(conId, appId);
                                alert('文件簽核完成');
                                this.$router.go(0);
                            } catch (error) {
                                console.error('Edit failed:', error);
                            }
                        }
                    }
                    else if (mMemberEnd) {
                        const mMemberParallel = await this.checkParallelTypeSign(conId, appId, 1);
                        if (mMemberParallel) {
                            if (this.uMemberData.length > 0) {
                                await this.uMemberData.forEach(mem=>{
                                    upMember = this.createUpMember(conId, appId, mem, '0', 0, false);
                                    try {
                                        this.updateMember(upMember);
                                    } catch (error) {
                                        console.error('Edit failed:', error);
                                    }
                                });
                                alert('簽核完成');
                                this.$router.go(0);
                            }
                            else {
                                try {
                                    let log = this.createSignLog(conId, appId, 0, '', 3, '文件簽核完成', 3);
                                    await this.goUpdateStatus(conId, 3, dayjs().format('YYYY-MM-DD'), log, useType);
                                    await this.clearMemberAll(conId, appId);
                                    alert('文件簽核完成');
                                    this.$router.go(0);
                                } catch (error) {
                                    console.error('Edit failed:', error);
                                }
                            }
                        }
                        else {
                            alert('簽核完成');
                            this.$router.go(0);
                        }
                    }
                    else if (uMemberEnd) {
                        const uMemberParallel = await this.checkParallelTypeSign(conId, appId, 2);
                        if (uMemberParallel) {
                            try {
                                let log = this.createSignLog(conId, appId, 0, '', 3, '文件簽核完成', 3);
                                await this.goUpdateStatus(conId, 3, dayjs().format('YYYY-MM-DD'), log, useType);
                                await this.clearMemberAll(conId, appId);
                                alert('文件簽核完成');
                                this.$router.go(0);
                            } catch (error) {
                                console.error('Edit failed:', error);
                            }
                        }
                        else {
                            alert('簽核完成');
                            this.$router.go(0);
                        }
                    }
                    else {
                        alert('簽核完成');
                        this.$router.go(0);
                    }
                } catch (error) {
                    console.error('Edit failed:', error);
                }
            }
            this.$router.go(0);
        },
        // 退回 backContract useType 0=conId, 1=addId
        async backContract(conId, appId, useType) {
            let upMember = null;
            if (this.iMemberData.comId === this.per.comId && this.iMemberData.memNowKey === this.per.perKey) {
                const isLV = this.getMemberLV(this.iMemberData);
                if (isLV) {
                    upMember = this.createUpMember(conId, appId, this.iMemberData, isLV, 2, true);
                }
            }
            this.mMemberData.forEach((mem) => {
                if (mem.comId === this.per.comId && mem.memNowKey === this.per.perKey) {
                    const isLV = this.getMemberLV(mem);
                    if (isLV) {
                        upMember = this.createUpMember(conId, appId, mem, isLV, 2, false);
                    }
                }
            });
            this.uMemberData.forEach((mem) => {
                if (mem.comId === this.per.comId && mem.memNowKey === this.per.perKey) {
                    const isLV = this.getMemberLV(mem);
                    if (isLV) {
                        upMember = this.createUpMember(conId, appId, mem, isLV, 2, false);
                    }
                }
            });
            if (upMember) {
                try {
                    await this.updateMember(upMember);
                    let log = this.createSignLog(conId, appId, upMember.memId, upMember.LVKey, 2, '文件退回', 2);
                    await this.goUpdateStatus(conId, 2, null, log, useType);
                    await this.clearMemberAll(conId, appId);
                    this.$router.push(`/contract/list`);

                } catch (error) {
                    console.error('Edit failed:', error);
                }
            }
            this.$router.go(0);
        },

        async goUpdateStatus(id, status, date, log, useType) {
            if (0 === useType) {
                await this.updateContractStatus(id, status, date, log);//修改文件狀態為進行中
            }
            if (1 === useType) {
                await this.updateApportionStatus(id, status, date, log);//修改文件狀態為進行中
            }
        },
        // updateContractStatus(狀態, 生效日期, log) 修改文件簽核狀態
        async updateContractStatus(conId, status, date, log) {
            const payload = {
                conId: conId,
                conStatus: status,
                conDate: date,
                sglLog: log,
            };
            console.log(payload);
            try {
                await this.$api.put(
                    this.$test ? '/api/?type=contractStatus' : '/api/iform/contractStatus',
                    payload
                );
            } catch (error) {
                console.error('Edit failed:', error);
            }
            return false;

        },
        // updateApportionStatus(狀態, 生效日期, log) 修改文件簽核狀態
        async updateApportionStatus(appId, status, date, log) {
            const payload = {
                appId: appId,
                conStatus: status,
                conDate: date,
                sglLog: log,
            };
            console.log(payload);
            try {
                await this.$api.put(
                    this.$test ? '/api/?type=contractStatus' : '/api/iform/contractStatus',
                    payload
                );
            } catch (error) {
                console.error('Edit failed:', error);
            }
            return false;

        },



        async goDefaultSet(useType) {
            if (0 === useType) {
                await this.defaultContract();//重置文件資訊與簽核人員資料
            }
            if (1 === useType) {
                await this.defaultApportion();//重置文件資訊與簽核人員資料
            }
        },
        // defaultContract 重置文件狀態
        async defaultContract() {
            // 修改文件狀態為草稿模式，並重置所有簽核人員訊息狀態與時間
            try {
                const payload = {
                    conId: this.conId,
                };

                const response = await this.$api.put(
                    this.$test ? '/api/?type=contractDefault' : '/api/iform/contractDefault',
                    payload
                );

                if (response.status === 200) {
                    console.log('Edit successful:', response.data.data);
                    return true;
                } else {
                    console.log('err');
                }
            } catch (error) {
                console.error('Edit failed:', error);
            }
            return false;
        },
        // defaultApportion 重置文件狀態
        async defaultApportion() {
            // 修改文件狀態為草稿模式，並重置所有簽核人員訊息狀態與時間
            try {
                const payload = {
                    conId: this.conId,
                };

                const response = await this.$api.put(
                    this.$test ? '/api/?type=contractDefault' : '/api/iform/contractDefault',
                    payload
                );

                if (response.status === 200) {
                    console.log('Edit successful:', response.data.data);
                    return true;
                } else {
                    console.log('err');
                }
            } catch (error) {
                console.error('Edit failed:', error);
            }
            return false;
        },






        // 產生執行資料
        createUpMember(conId, appId, mem, isLV, signType, first) {//signType :0 開始待檢視 3簽核 2退件
            const memId = mem.memId;
            const time = signType === 0 ? null : dayjs().format('YYYY-MM-DD HH:mm:ss');
            const msg = signType === 0 || signType === 3 ? null : this.msg;
            const comTitle = this.$root.getCompanyTitle(mem.comId, '');
            const memBu2 = mem.memBu2;
            const memBu3 = mem.memBu3;
            const positionName = this.getLVPositionName(mem, isLV);
            const LVKey = this.getLVKey(mem, isLV);
            const positionNameNext = this.getLVPositionNameNext(mem, isLV, first);
            let sglLogMsg = null;
            let isNext = null;
            let nextLVKey = null;
            let nextLVStatus = null;
            let nextLogMsg = null;
            let memStatus = null;
            let memLVCKey = null;
            let memLVCName = null;
            let memLVCPositionName = null;
            let conStatus = 1;
            if (signType === 3) {
                sglLogMsg = `${comTitle} ${memBu2} ${memBu3} ${positionName} 簽核完成 ${msg !== null ? ':' + msg : ''}`
                switch (isLV) {
                    case '0':
                        isNext = first ? 'C' : '1';
                        nextLVKey = first ? '' : mem.memLV1Key;
                        nextLVStatus = 0;
                        nextLogMsg = first ? '窗口人員 待檢視' : `${comTitle} ${memBu2} ${memBu3} ${positionNameNext} 待檢視`;
                        memStatus = 1;
                        break;
                    case 'C':
                        memLVCKey = this.per.perKey;
                        memLVCName = this.per.perName;
                        memLVCPositionName = this.per.perPositionName;
                        isNext = '1';
                        nextLVKey = mem.memLV1Key;
                        nextLVStatus = 0;
                        nextLogMsg = `${comTitle} ${memBu2} ${memBu3} ${positionNameNext} 待檢視`;
                        memStatus = 1;
                        break;
                    case '1':
                        isNext = '2';
                        nextLVKey = mem.memLV2Key;
                        nextLVStatus = 0;
                        nextLogMsg = `${comTitle} ${memBu2} ${memBu3} ${positionNameNext} 待檢視`;
                        memStatus = 1;
                        break;
                    case '2':
                        isNext = '';
                        nextLVKey = '';
                        nextLVStatus = -1;
                        memStatus = signType;
                }
            }
            else {
                if (signType === 2) {
                    conStatus = 2;
                    sglLogMsg = `${comTitle} ${memBu2} ${memBu3} ${positionName} 退件 ${msg !== '' ? ':' + msg : null}`
                }
                else if (signType === 0) {
                    nextLVKey = mem.memLV0Key;
                    nextLVStatus = 0;
                    sglLogMsg = `${comTitle} ${memBu2} ${memBu3} ${positionName} 待檢視`
                }
                memStatus = signType;
            }


            return {
                conId: conId,
                appId: appId,
                memId: memId,
                [`memLV${isLV}Status`]: signType,
                [`memLV${isLV}Time`]: time,
                [`memLV${isLV}Msg`]: msg,
                [`memLV${isNext}Status`]: signType === 3 && '' !== isNext ? 0 : null,
                memLVCKey: memLVCKey,
                memLVCName: memLVCName,
                memLVCPositionName: memLVCPositionName,
                LVKey: LVKey,
                memNowKey: nextLVKey,
                memNowStatus: nextLVStatus,
                memStatus: memStatus,
                sglLog: this.createSignLog(conId, appId, memId, LVKey, signType, sglLogMsg, conStatus),
                sglLogNext: nextLogMsg ? this.createSignLog(conId, appId, memId, nextLVKey, nextLVStatus, nextLogMsg, conStatus) : null,
            };
        },

        //取得姓名與職稱
        getLVKey(mem, isLV) {
            switch (isLV) {
                case '0':
                    return `${mem.memLV0Key}`;
                case 'C':
                    return `${mem.memLVCKey}`;
                case '1':
                    return `${mem.memLV1Key}`;
                case '2':
                    return `${mem.memLV2Key}`;
                default:
                    return '';
            }
        },
        //取得姓名與職稱
        getLVPositionName(mem, isLV) {
            switch (isLV) {
                case '0':
                    return `${mem.memLV0Name} ${mem.memLV0PositionName}`;
                case 'C':
                    return `${mem.memLVCName} ${mem.memLVCPositionName}`;
                case '1':
                    return `${mem.memLV1Name} ${mem.memLV1PositionName}`;
                case '2':
                    return `${mem.memLV2Name} ${mem.memLV2PositionName}`;
                default:
                    return '';
            }
        },
        //取得下一位姓名與職稱
        getLVPositionNameNext(mem, isLV, first) {
            switch (isLV) {
                case '0':
                    return first ? `${mem.memLVCName} ${mem.memLVCPositionName}` : `${mem.memLV1Name} ${mem.memLV1PositionName}`;
                case 'C':
                    return `${mem.memLV1Name} ${mem.memLV1PositionName}`;
                case '1':
                    return `${mem.memLV2Name} ${mem.memLV2PositionName}`;
                default:
                    return '';
            }
        },
        //取得對應等級
        getMemberLV(mem) {
            if (mem.memLV0Key === this.per.perKey && parseInt(mem.memLV0Status) < 2 ) {
                return '0';
            }
            if (mem.memNowKey === '') {
                return 'C';
            }
            if (mem.memLV1Key === this.per.perKey && parseInt(mem.memLV1Status) < 2) {
                return '1';
            }
            if (mem.memLV2Key === this.per.perKey && parseInt(mem.memLV2Status) < 2) {
                return '2';
            }
            return null; // 如果都不满足条件，则返回 null
        },
        // checkParallelTypeSign 查驗平行簽核是否皆已完成
        async checkParallelTypeSign(conId, appId, memberType) {
            try {
                const response = await this.$api.get(
                    this.$test ? `/api/?type=signMember` : `/api/iform/signMember/List`
                    , {params: {conId: conId, appId: appId, memType: memberType, memStatusNot:3}}
                );

                if (response.status === 200) {
                    const data = response.data.data;
                    if (data.length != 0) {
                        return false;
                    }
                } else {
                    console.log('err');
                }
            } catch (error) {
                console.error('Edit failed:', error);
            }
            return true;
        },
        // updateMember 修改簽核人員簽核狀態
        async updateMember(payload) {
            try {
                const response = await this.$api.put(
                    this.$test ? '/api/?type=memberStatus' : '/api/iform/memberStatus',
                    payload
                );

                if (response.status === 200) {
                    return true;
                } else {
                    console.log('err');
                }
            } catch (error) {
                console.error('Edit failed:', error);
            }
            return false;

        },
        // clearMemberAll 重置所有簽核人員狀態
        async clearMemberAll(conId, appId) {
            const payload = {
                conId: conId,
                appId: appId,
                memNow: '',
                memNowPosition: '',
                memNowStatus: -1,
            };
            try {
                const response = await this.$api.put(
                    this.$test ? '/api/?type=memberStatusAll' : '/api/iform/memberStatusAll',
                    payload
                );

                if (response.status === 200) {
                    return true;
                } else {
                    console.log('err');
                }
            } catch (error) {
                console.error('Edit failed:', error);
            }
            return false;

        },
        // checkMember 確認權限
        checkMember() {
            let ckMember = false;
            if (this.iMemberData.memNowKey === this.per.perKey) {
                if (this.iMemberData.memLV0Key === this.per.perKey && (parseInt(this.iMemberData.memLV0Status) === 0 || parseInt(this.iMemberData.memLV0Status) === 1)) {
                    ckMember = true;
                }
                if (this.iMemberData.memLV1Key === this.per.perKey && (parseInt(this.iMemberData.memLV1Status) === 0 || parseInt(this.iMemberData.memLV1Status) === 1)) {
                    ckMember = true;
                }
                if (this.iMemberData.memLV2Key === this.per.perKey && (parseInt(this.iMemberData.memLV2Status) === 0 || parseInt(this.iMemberData.memLV2Status) === 1)) {
                    ckMember = true;
                }
            }
            if (this.iMemberData.memNowKey === '' && this.iMemberData.memLVCKey === '' && this.contactData.some(contact => contact.perKey.includes(this.per.perKey))){
                if (parseInt(this.iMemberData.memLVCStatus) === 0 || parseInt(this.iMemberData.memLVCStatus) === 1) {
                    ckMember = true;
                }
            }
            this.mMemberData.forEach(mem => {
                if (mem.comId === this.per.comId && mem.memNowKey === this.per.perKey) {
                    if (mem.memLV0Key === this.per.perKey && (parseInt(mem.memLV0Status) === 0 || parseInt(mem.memLV0Status) === 1)) {
                        ckMember = true;
                    }
                    if (mem.memLV1Key === this.per.perKey && (parseInt(mem.memLV1Status) === 0 || parseInt(mem.memLV1Status) === 1)) {
                        ckMember = true;
                    }
                    if (mem.memLV2Key === this.per.perKey && (parseInt(mem.memLV2Status) === 0 || parseInt(mem.memLV2Status) === 1)) {
                        ckMember = true;
                    }
                }
            });
            this.uMemberData.forEach(mem => {
                if (mem.comId === this.per.comId && mem.memNowKey === this.per.perKey) {
                    if (mem.memLV0Key === this.per.perKey && (parseInt(mem.memLV0Status) === 0 || parseInt(mem.memLV0Status) === 1)) {
                        ckMember = true;
                    }
                    if (mem.memLV1Key === this.per.perKey && (parseInt(mem.memLV1Status) === 0 || parseInt(mem.memLV1Status) === 1)) {
                        ckMember = true;
                    }
                    if (mem.memLV2Key === this.per.perKey && (parseInt(mem.memLV2Status) === 0 || parseInt(mem.memLV2Status) === 1)) {
                        ckMember = true;
                    }
                }
            });
            return ckMember;
        },
        createSignLog(conId, appId, memId, perKey, memStatus, msg, status) {
            const signLog = {
                conId: conId,
                appId: appId,
                memId: memId,
                perKey: perKey,
                sglMemberStatus: memStatus,
                sglMsg: msg,
                sglStatus: status
            };
            return JSON.stringify(signLog);
        },

    },
};
