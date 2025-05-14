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
  Board: {
    Base: '/board',
    Defaults: '/defaults',
  },
} as const;
