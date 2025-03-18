import { Router } from 'express';
import Paths from "@src/common/paths";

// Import our handlers
import ping from './ping'

// Set up routes
const debugRouter = Router();
debugRouter.get(Paths.Debug.Ping, ping);

// Export it out for use by the main router
export default debugRouter;
