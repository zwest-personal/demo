import Config from '@src/common/config';

export default {
  Base: Config.ApiPath,
  Socket: {
    Connect: '/ws',
  },
  Debug: {
    Ping: '/ping'
  },
} as const;
