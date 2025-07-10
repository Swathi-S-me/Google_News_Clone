import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import Main from "../layouts/Main";
import Following from "../components/Following/Following";
import NotFound from "../components/NotFound";

const rootRoute = createRootRoute({
  component: Main,
  notFoundComponent: NotFound,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => null,
});

const followingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/following",
  component: Following,
});

const routeTree = rootRoute.addChildren([indexRoute, followingRoute]);

export const router = createRouter({ routeTree });
