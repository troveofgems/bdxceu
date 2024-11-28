import * as crypto from "node:crypto";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const encryptPassword = async function (next) {
  const encryptThePassword = async () => {
    const { BCRYPT_GEN_ROUNDS } = process.env,
      ROUNDS = BCRYPT_GEN_ROUNDS ? parseInt(BCRYPT_GEN_ROUNDS) : 10,
      salt = await bcryptjs.genSalt(ROUNDS);

    return (this.password = await bcryptjs.hash(this.password, salt));
  };

  if (!this.isModified("password")) {
    return next();
  } else if (this.password) {
    // This is either registration or the password has been updated.
    await encryptThePassword();
  }

  return next();
};

export const getSignedJwt = function () {
  const { APP_AUTH_TOKEN_KEY, APP_AUTH_TOKEN_EXPIRATION } = process.env;

  return jwt.sign({ id: this._id }, APP_AUTH_TOKEN_KEY, {
    expiresIn: `${APP_AUTH_TOKEN_EXPIRATION}`,
  });
};

export const verifyCredentials = async function (userEnteredPassword) {
  return await bcryptjs.compare(userEnteredPassword, this.password);
};

export const getResetPasswordToken = async function (model) {
  const resetToken = crypto.randomBytes(20).toString("hex"),
    encryptedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

  // Set The ResetToken Value
  model.resetPasswordToken = encryptedToken;

  // Set An Expiration of 10 Minutes
  model.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  await model.save();

  return encryptedToken;
};
