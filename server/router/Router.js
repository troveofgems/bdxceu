// Route Imports
import { default as UserRoutes } from "./routes/user.routes.js";
import { default as VideoRoutes } from "./routes/video.routes.js";
//import { default as CommentRoutes } from "./routes/comment.routes.js";
import { default as AuthRoutes } from "./routes/auth.routes.js";
import { default as TeamRoutes } from "./routes/team.routes.js";
import { default as ProductRoutes } from "./routes/product.routes.js";
import { default as AdminRoutes } from "./routes/admin.routes.js";
import { default as OrderRoutes } from "./routes/order.routes.js";
import { default as PaymentMethodRoutes } from "./routes/payment.method.routes.js";
import { default as FEHelperRoutes } from "./routes/fe.helper.routes.js";
import { default as SiteSettingsRoutes } from "./routes/siteSettings.routes.js";
import { default as ExamRoutes } from "./routes/exam.routes.js";

export const mountRouterToApplication = async (app) => {
  const // This is the main mainRouter. It bundles all sub-routes and mounts them to the application
    eb_designator = process.env.API_PATH || "/api/",
    eb_apiVersion = process.env.API_VERSION || "v1.0.0/",
    eb_apiPrefix = `${eb_designator}${eb_apiVersion}`,
    backend_apiRoutes = [
      {
        route: "admin",
        routeLoader: AdminRoutes,
      },
      {
        route: "auth",
        routeLoader: AuthRoutes,
      },
      {
        route: "orders",
        routeLoader: OrderRoutes,
      },
      {
        route: "user",
        routeLoader: UserRoutes,
      },
      {
        route: "exam",
        routeLoader: ExamRoutes,
      },
      {
        route: "video",
        routeLoader: VideoRoutes,
      },
      {
        route: "team",
        routeLoader: TeamRoutes,
      },
      {
        route: "payment-method",
        routeLoader: PaymentMethodRoutes,
      },
      {
        route: "products",
        routeLoader: ProductRoutes,
      },
      {
        route: "server",
        routeLoader: FEHelperRoutes,
      },
      {
        route: "site-settings",
        routeLoader: SiteSettingsRoutes,
      },
    ];

  // Mount Routes To The Application
  backend_apiRoutes.forEach((route) => {
    if (process.env.NODE_ENV === "dev") {
      console.log("Mounted: ", `${eb_apiPrefix}${route.route}`);
    }
    app.use(`${eb_apiPrefix}${route.route}`, route.routeLoader);
  });

  return app;
};
