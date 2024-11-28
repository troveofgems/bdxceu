import { buildAPIBodyResponse } from "../libs/dev/controller.utils.js";
import SiteSettings from "../db/models/SiteSettings.model.js";

export const handleFetchSiteSettings = async (req, res, next) => {
  let apiResponse = buildAPIBodyResponse("/admin/site-settings"),
    siteSettings = await SiteSettings.find({}, null, null);

  apiResponse.success = true;
  apiResponse.data = siteSettings;

  return res.status(200).json(apiResponse);
};

export const handleSiteSettingsChanges = async (req, res, next) => {
  let apiResponse = buildAPIBodyResponse("/admin/site-settings"),
    siteSettings = {};

  const {
    // Controls
    showSiteAddress,
    showSiteSupportEmail,
    showSiteTelephone,
    showSiteFacilityMorningHours,
    showSiteFacilityEveningHours,
    showSiteLiveCourseDates,
    showSiteRecordedCourseDates,
    showSocialsAltWebsite,
    showSocialsFacebook,
  } = req.body;

  const {
    // Values
    address = null,
    email = null,
    morningHours = null,
    eveningHours = null,
    liveCourses = null,
    recordedCourses = null,
    socialsWebsite = null,
    socialsFacebook = null,
    phone = null,
  } = req.body;

  /** Process Site Contact Fields */
  siteSettings.siteContact = {
    address: { val: null, show: false },
    supportEmail: { val: null, show: false },
    supportPhone: { val: null, show: false },
  };

  // Address
  if (showSiteAddress) {
    siteSettings.siteContact.address.val = address;
    siteSettings.siteContact.address.show = true;
  } else {
    siteSettings.siteContact.address.show = false;
  }

  // Support Email
  if (showSiteSupportEmail) {
    siteSettings.siteContact.supportEmail.val = email;
    siteSettings.siteContact.supportEmail.show = true;
  } else {
    siteSettings.siteContact.supportEmail.show = false;
  }

  // Support Telephone
  if (showSiteTelephone) {
    siteSettings.siteContact.supportPhone.val = phone;
    siteSettings.siteContact.supportPhone.show = true;
  } else {
    siteSettings.siteContact.supportPhone.show = false;
  }

  /** Process Facility Hours Fields */
  siteSettings.facilityHours = {
    morning: { val: null, show: false },
    evening: { val: null, show: false },
  };

  // Morning Hours
  if (showSiteFacilityMorningHours) {
    siteSettings.facilityHours.morning.val = morningHours;
    siteSettings.facilityHours.morning.show = true;
  } else {
    siteSettings.facilityHours.morning.show = false;
  }

  // Evening Hours
  if (showSiteFacilityEveningHours) {
    siteSettings.facilityHours.evening.val = eveningHours;
    siteSettings.facilityHours.evening.show = true;
  } else {
    siteSettings.facilityHours.evening.show = false;
  }

  /** Process Course Dates Fields */
  siteSettings.courseDates = {
    live: { val: null, show: false },
    prerecorded: { val: null, show: false },
  };

  // Live Course Dates
  if (showSiteLiveCourseDates) {
    siteSettings.courseDates.live.val = liveCourses;
    siteSettings.courseDates.live.show = true;
  } else {
    siteSettings.courseDates.live.show = false;
  }

  // Pre-recorded Course Dates
  if (showSiteRecordedCourseDates) {
    siteSettings.courseDates.prerecorded.val = recordedCourses;
    siteSettings.courseDates.prerecorded.show = true;
  } else {
    siteSettings.courseDates.prerecorded.show = false;
  }

  /** Process Socials Fields */
  siteSettings.socials = {
    altWebsite: { val: null, show: false },
    facebook: { val: null, show: false },
  };

  // Alternate Website
  if (showSocialsAltWebsite) {
    siteSettings.socials.altWebsite.val = socialsWebsite;
    siteSettings.socials.altWebsite.show = true;
  } else {
    siteSettings.socials.altWebsite.show = false;
  }

  // Facebook
  if (showSocialsFacebook) {
    siteSettings.socials.facebook.val = socialsFacebook;
    siteSettings.socials.facebook.show = true;
  } else {
    siteSettings.socials.facebook.show = false;
  }

  console.log("Working with ", siteSettings);

  let query = {},
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

  // Upsert the document
  let doc = await SiteSettings.findOneAndUpdate(query, siteSettings, options);

  console.log(doc);

  apiResponse.success = true;
  apiResponse.data = siteSettings;

  return res.status(200).json(apiResponse);
};
