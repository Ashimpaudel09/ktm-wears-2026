import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
    route("product/:id", "routes/productdetail.tsx"),
    route("shop","routes/shop.tsx")
  ]),
] satisfies RouteConfig;
