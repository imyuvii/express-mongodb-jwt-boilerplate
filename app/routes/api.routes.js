module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
    const conversations = require("../controllers/conversations.controller.js");
    const authJWT = require("../routes/middleware.js").authenticateJWT;

    /**
     * Routes
     * @type {Router}
     */
    var router = require("express").Router();

    /**
     * Auth
     */
    router.post("/auth/login", auth.login);
    router.post("/auth/signup", auth.signup);
    router.get("/auth/me", authJWT, auth.me);

    /**
     * Conversations
     */
    router.get("/conversation/:id", authJWT, conversations.findOne);
    router.get("/conversation/test", authJWT, conversations.test);

    app.use("/api", router);
};
