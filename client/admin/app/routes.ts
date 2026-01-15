// app/routes.ts
import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  // Add index route that redirects to dashboard
  index("routes/_index.tsx"),
  layout("routes/_auth.tsx", [
    route("dashboard", "routes/_auth.dashboard.tsx"),
    route("categories", "routes/_auth.categories.tsx"),
    route("products", "routes/_auth.products.tsx"),
  ]),
] satisfies RouteConfig;