import Config from '@src/config';

export default {
  Base: Config.API_PATH,
  Socket: {
    Connect: '/ws',
  },
  Debug: {
    Base: '/debug',
    Ping: '/ping',
    Connections: '/connections',
  },
} as const;
