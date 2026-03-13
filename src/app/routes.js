/**
 * DEPRECATED: This file is kept for backward compatibility
 * Please use /src/app/routes/index.js instead
 *
 * Old route configuration has been moved to:
 * - src/app/routes/publicRoutes.js
 * - src/app/routes/clientRoutes.js
 * - src/app/routes/adminRoutes.js
 */

// Note: this deprecated file used to import from the same path, which
// inadvertently caused a circular dependency because Node/webpack would
// resolve "./routes" to this file itself.  To maintain backward
// compatibility while avoiding the error we now explicitly reference the
// directory index.  Any consumer should prefer importing from
// "./routes/index" or the individual route modules instead.

import { createAppRoutes } from './routes/index';

export default createAppRoutes;
