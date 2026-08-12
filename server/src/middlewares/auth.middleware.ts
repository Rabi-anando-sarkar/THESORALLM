import type { NextFunction,Request,Response } from "express";
import type { Session } from "../utils/session.js";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../libs/auth.js";

declare module "express-serve-static-core" {
    interface Request {
        session: Session
    }
}

export async function requireAuth(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers)
    })

    if(!session?.user) {
        res.status(401).json({
            error: "Unauthorised"
        })
        return
    }

    req.session = session
    next()
}