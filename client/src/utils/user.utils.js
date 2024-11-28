import SheilaJackson from "../assets/images/placeholders/sj.png";
import BeauDaniels from "../assets/images/team/daniels_headshot_4.jpg";
import EddieStanislawski from "../assets/images/team/stanislawski_headshot_2.jpg";
import LaurenJung from "../assets/images/team/jung_headshot.jpg";
import AnonProfile from "../assets/images/placeholders/anon_profile.png";

const siteHeadshotList = [
    {
        name: "sheila.jackson",
        headshot: SheilaJackson,
    },
    {
        name: "lauren.jung",
        headshot: LaurenJung
    },
    {
        name: "beau.daniels",
        headshot: BeauDaniels,
        appendCSS: "img-responsive",
        imgDimensions: {
            height: 636,
            width: 500
        }
    },
    {
        name: "eddie.stanislawski",
        headshot: EddieStanislawski,
        appendCSS: "img-responsive",
        imgDimensions: {
            height: 636,
            width: 500
        }
    },
    {
        name: "anon",
        headshot: AnonProfile,
        appendCSS: "img-responsive addAnonPadding",
        imgDimensions: {
            height: 375,
            width: 250
        }
    },
];

export const getUserInfo = (user) => {
    return {
        isLoggedIn: !!user,
        isStudent: (user?.authLevel === "student" || false),
        isTeamMember: (user?.authLevel === "team-member" || false),
        isAuditor: (user?.authLevel === "auditor" || false),
        isAdmin: (user?.authLevel === "admin" || false)
    }
}

export const getSiteTeamHeadshots = (headshotFor = "anon") => {
    let artifactToReturn = siteHeadshotList.find(user => user.name === headshotFor);

    // If no artifact is found for the given params, always return the Anon Headshot Obj.
    if(artifactToReturn === undefined || artifactToReturn === null) {
        artifactToReturn = siteHeadshotList.find(user => user.name === "anon");
    }

    return artifactToReturn;
}
export const getSiteTeamHeadshotArtifact = (headshotFor = "anon", artifactNeeded = null) => {
    let artifactToReturn = siteHeadshotList.find(user => user.name === headshotFor);

    // If no artifact is found for the given params, always return the Anon Headshot Obj.
    if(artifactToReturn === undefined || artifactToReturn === null) {
        artifactToReturn = siteHeadshotList.find(user => user.name === "anon");
    }

    return artifactToReturn[artifactNeeded];
}