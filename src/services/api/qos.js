import { getQosBandwidth, updateQosBandwidth, getQosRule, updateQosRule } from '../api';
export const qosApi = {
    getBandwidth: async () => {
        return getQosBandwidth();
    },
    updateBandwidth: async (config) => {
        await updateQosBandwidth(config);
    },
    getRule: async () => {
        return getQosRule();
    },
    updateRule: async (config) => {
        await updateQosRule(config);
    }
};
