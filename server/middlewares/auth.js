import { clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
    try {
        const { userId } = await req.auth();
        if (!userId) {
            return res.redirect('/login');
        }
        const user = await clerkClient.users.getUser(userId);
        req.user = user;
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        res.redirect('/login');
    }
};
