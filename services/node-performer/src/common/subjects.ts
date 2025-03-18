import Config from '@src/common/config';

export default {
    Ready: `${Config.Env}.ready`,
    Broadcast: `${Config.Env}.broadcast`,
} as const;
