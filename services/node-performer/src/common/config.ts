import jetEnv, {str} from 'jet-env';
import {isEnumVal} from 'jet-validators';
import {NodeEnvs} from './constants';

const Config = jetEnv({
    ServiceName: str,
    Env: isEnumVal(NodeEnvs),
    ServerPort: str,
    ApiPath: str,
    RedisCn: str,
    MongoCn: str,
    MongoDb: str,
    NatsCn: str,
});

export default Config;
