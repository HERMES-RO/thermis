import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import { Guest_routers } from "./router/Guest.router";
import { routers } from "./router/user.route";
const routers_combine = [...routers, ...Guest_routers];
const router = createBrowserRouter(routers_combine);

const query = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={query}>
    <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
