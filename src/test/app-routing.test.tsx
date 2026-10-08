import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("targets the landing question when returning home from a later step", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const location = router.buildLocation({ to: "/", hash: "step-zip" });
    expect(location.pathname).toBe("/");
    expect(location.hash).toBe("step-zip");
    expect(location.href).toBe("/#step-zip");
  });
  it.each(["/privacy-policy", "/terms-conditions", "/disclaimer", "/licensing", "/disclaimers"])("matches the legal document at %s", (path) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes(path).at(-1)?.routeId).toBe(path);
  });
  it("matches the dedicated contact page", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes("/contact").at(-1)?.routeId).toBe("/contact");
  });
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});
