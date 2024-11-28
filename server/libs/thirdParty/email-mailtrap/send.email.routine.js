import nodemailer from "nodemailer";
const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD } = process.env;

import { setRegistrationEmailTemplate } from "./templates/auth/registration/registration.template.js";
import { setAccountLockoutEmailTemplate } from "./templates/auth/lockout/lockout.template.js";
import { setPasswordResetEmailTemplate } from "./templates/auth/passwordReset/passwordReset.template.js";
import { setAccountInfoUpdatedEmailTemplate } from "./templates/auth/accountUpdate/accountUpdate.template.js";
import { setRegistrationTeamMemberEmailTemplate } from "./templates/auth/addTeamMember/registration.team.member.template.js";
import { setOrderPlacedEmailTemplate } from "./templates/order/placed/placed.template.js";
import { setProductPublishedEmailTemplate } from "./templates/product/published/product.published.template.js";

export const sendEmail = async function (templateType, emailData) {
  let transport = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  });

  try {
    const filledTemplate = fetchTemplate(templateType, emailData);

    let message = {
      from: `${process.env.EMAIL_APP_SENDER_NAME} <${process.env.EMAIL_APP_SENDER_ID}>`,
      to: emailData.email,
      subject: filledTemplate.subject,
      text: filledTemplate.textBody, // Plain Text Body
      html: filledTemplate.htmlTemplate, // HTML Body
    };
    console.log("Message To Send Is: ", message);
    const info = await transport.sendMail(message);
    console.log("Message sent: %s", info.messageId);
    return info.messageId;
  } catch (err) {
    console.error("Error Sending Email: ", err);
  }
};

const fetchTemplate = function (templateType, emailData) {
  let emailTemplate = null;
  switch (templateType) {
    case "register":
      emailTemplate = setRegistrationEmailTemplate(emailData);
      break;
    case "addTeamMember":
      emailTemplate = setRegistrationTeamMemberEmailTemplate(emailData);
      break;
    case "lockout":
      emailTemplate = setAccountLockoutEmailTemplate(emailData);
      break;
    case "accountUpdate":
      emailTemplate = setAccountInfoUpdatedEmailTemplate(emailData);
      break;
    /*case "rolePromotion":
            emailTemplate = setRolePromotionEmailTemplate(emailData);
            break;*/
    case "passwordReset":
      emailTemplate = setPasswordResetEmailTemplate(emailData);
      break;
    case "orderPlaced":
      emailTemplate = setOrderPlacedEmailTemplate(emailData);
      break;
    case "productPublished":
      emailTemplate = setProductPublishedEmailTemplate(emailData);
      break;
    /*case "orderCancelled":
            emailTemplate = setOrderCancelledEmailTemplate(emailData);
            break;
        case "orderShipped":
            emailTemplate = setOrderShippedEmailTemplate(emailData);
            break;
        case "orderRefunded":
            emailTemplate = setOrderRefundedEmailTemplate(emailData);
            break;*/
    default:
      return null;
  }
  return emailTemplate;
};
