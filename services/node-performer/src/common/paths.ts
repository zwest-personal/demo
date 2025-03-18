import Config from '@src/common/config';

export default {
  Base: Config.ApiPath,
  Socket: {
    Connect: '/ws',
  },
  Debug: {
    Base: '/debug',
    Ping: '/ping'
  },
} as const;
