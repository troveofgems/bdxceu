import mongoose from "mongoose";
const timestamps = {
  timestamps: true,
};

const SiteSettingsModel = new mongoose.Schema(
  {
    siteContact: {
      type: {
        address: {
          type: {
            val: {
              type: String,
              required: true,
              default: "1011 Rancho Conejo Blvd. Thousand Oaks, CA 91320",
            },
            show: {
              type: Boolean,
              required: true,
              default: false,
            },
          },
        },
        supportEmail: {
          type: {
            val: {
              type: String,
              required: true,
              default: "support@bdxceu.com",
            },
            show: {
              type: Boolean,
              required: true,
              default: false,
            },
          },
        },
        supportPhone: {
          val: {
            type: String,
            required: true,
            default: "+0000000000",
          },
          show: {
            type: Boolean,
            required: true,
            default: false,
          },
        },
      },
      required: true,
    },
    facilityHours: {
      type: {
        morning: {
          type: {
            val: {
              type: String,
              required: true,
              default: "07:00 (7:00 AM)",
            },
            show: {
              type: Boolean,
              required: true,
              default: false,
            },
          },
        },
        evening: {
          type: {
            val: {
              type: String,
              required: true,
              default: "17:00 (5:00 PM)",
            },
            show: {
              type: Boolean,
              required: true,
              default: false,
            },
          },
        },
      },
      required: true,
    },
    courseDates: {
      type: {
        live: {
          type: {
            val: {
              type: String,
              required: true,
              default: "January 1st, 2025",
            },
            show: {
              type: Boolean,
              required: true,
              default: false,
            },
          },
        },
        prerecorded: {
          type: {
            val: {
              type: String,
              required: true,
              default: "Open Enrollment!",
            },
            show: {
              type: Boolean,
              required: true,
              default: false,
            },
          },
        },
      },
      required: true,
    },
    socials: {
      type: {
        altWebsite: {
          type: {
            val: {
              type: String,
              required: true,
              default: "https://sportsacademy.us/",
            },
            show: {
              type: Boolean,
              required: true,
              default: false,
            },
          },
        },
        facebook: {
          type: {
            val: {
              type: String,
              required: true,
              default: "https://www.facebook.com/",
            },
            show: {
              type: Boolean,
              required: true,
              default: false,
            },
          },
        },
      },
      required: true,
    },
  },
  timestamps,
);

export default mongoose.model("SiteSettings", SiteSettingsModel);
