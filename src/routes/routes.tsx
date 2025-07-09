import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import Main from "../layouts/Main";
import Following from "../components/Following/Following";
import NotFound from "../components/NotFound";

// Root route with layout
const rootRoute = createRootRoute({
  component: Main,
  notFoundComponent: NotFound,
});

// Index route handled by Main, so render nothing
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => null,
});

// /following route
const followingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/following",
  component: Following,
});

const routeTree = rootRoute.addChildren([indexRoute, followingRoute]);

export const router = createRouter({ routeTree });
