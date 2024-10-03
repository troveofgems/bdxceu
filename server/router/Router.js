// Route Imports
import { default as UserRoutes } from "./routes/user.routes.js";
import { default as VideoRoutes } from "./routes/video.routes.js";
import { default as CommentRoutes } from "./routes/comment.routes.js";
import { default as AuthRoutes } from "./routes/auth.routes.js";

export const mountRouterToApplication = async (app) => {
    const // This is the main mainRouter. It bundles all sub-routes and mounts them to the application
        eb_designator = process.env.API_PATH || '/api/',
        eb_apiVersion = process.env.API_VERSION || 'v1.0.0/',
        eb_apiPrefix = `${eb_designator}${eb_apiVersion}`,
        backend_apiRoutes = [
            {
                route: "auth",
                routeLoader: AuthRoutes,
            },
            {
                route: "user",
                routeLoader: UserRoutes,
            },
            {
                route: "video",
                routeLoader: VideoRoutes,
            },
            {
                route: "comment",
                routeLoader: CommentRoutes,
            }
        ];

    // Mount Routes To The Application
    backend_apiRoutes.forEach(route => {
        console.log("Mounted: ", `${eb_apiPrefix}${route.route}`);
        app.use(`${eb_apiPrefix}${route.route}`, route.routeLoader);
    });

    return app;
}