import express from "express";
const router = express.Router();
import { requireAuth } from "../../middleware";
import { usersController } from "../../controllers/v2";
import { AuthMode } from "../../variables";

router.get(
  "/me",
  requireAuth({
    acceptedAuthModes: [AuthMode.JWT, AuthMode.API_KEY]
  }),
  usersController.getMe
);

router.patch(
  "/me/mfa",
  requireAuth({
    acceptedAuthModes: [AuthMode.JWT, AuthMode.API_KEY]
  }),
  usersController.updateMyMfaEnabled
);

router.patch(
  "/me/name",
  requireAuth({
    acceptedAuthModes: [AuthMode.JWT, AuthMode.API_KEY]
  }),
  usersController.updateName
);

router.put(
    "/me/auth-methods",
    requireAuth({
        acceptedAuthModes: [AuthMode.JWT, AuthMode.API_KEY],
    }),
    body("authMethods").exists().isArray({
        min: 1,
    }).custom((authMethods: AuthMethod[]) => {
        return authMethods.every(provider => [
            AuthMethod.EMAIL,
            AuthMethod.GOOGLE,
            AuthMethod.GITHUB,
            AuthMethod.GITLAB
        ].includes(provider))
    }),
    validateRequest,
    usersController.updateAuthMethods,
);

router.get(
  "/me/organizations",
  requireAuth({
    acceptedAuthModes: [AuthMode.JWT, AuthMode.API_KEY]
  }),
  usersController.getMyOrganizations
);

router.get(
  "/me/api-keys",
  requireAuth({
    acceptedAuthModes: [AuthMode.JWT]
  }),
  usersController.getMyAPIKeys
);

router.post(
  "/me/api-keys",
  requireAuth({
    acceptedAuthModes: [AuthMode.JWT]
  }),
  usersController.createAPIKey
);

router.delete(
  "/me/api-keys/:apiKeyDataId",
  requireAuth({
    acceptedAuthModes: [AuthMode.JWT]
  }),
  usersController.deleteAPIKey
);

router.get(
  "/me/sessions",
  requireAuth({
    acceptedAuthModes: [AuthMode.JWT]
  }),
  usersController.getMySessions
);

router.delete(
  "/me/sessions",
  requireAuth({
    acceptedAuthModes: [AuthMode.JWT]
  }),
  usersController.deleteMySessions
);

export default router;
