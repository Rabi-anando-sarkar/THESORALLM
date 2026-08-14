import type { Express } from "express"
import { shelfRoutes } from "./shelf.route.js"

export function registerRoutes(app:Express): void {
    app.use("/api/workspaces", shelfRoutes)
}