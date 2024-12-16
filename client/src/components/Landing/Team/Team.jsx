import React from "react";

// Team Data
import { useGetTeamQuery } from "../../../redux/slices/userSlice";

// Page Spinner
import { Preloader } from "../../shared/Preloader/Preloader";

import { getSiteTeamHeadshotArtifact } from "../../../utils/user.utils";

// Associated Styles
import "../parallax.css";
import "./Team.css";
const Team = () => {
  const {
    data: team,
    isLoading: isLoadingTeamList,
    error: teamListError,
    refetch: refetchTeamList,
  } = useGetTeamQuery();

  return isLoadingTeamList ? (
    <Preloader />
  ) : (
    <section id="chiropractic-team" className="parallax-section">
      <div className="container">
        <div className="row">
          <div
            className="wow fadeInUp col-md-12 col-sm-12"
            data-wow-delay="1.3s"
          >
            <h2>Our Chiropractic Team</h2>
            <p>Lorem ipsum dolor sit amet, maecenas eget vestibulum justo.</p>
          </div>
          {team?.data?.length === 0 && (
            <h4 className={"no__team_data"}>No Team Data Available!</h4>
          )}
          {team?.data?.length > 0 &&
            team.data.map((teamMember, index) => (
              <div
                key={`${teamMember._id}_${index}`}
                className="wow fadeInUp col-md-4 col-sm-6"
                data-wow-delay="1.9s"
              >
                <div className="chiropractic-team-thumb">
                  <h4 className={"teamMemberNameBanner__Mobile"}>
                    {teamMember.firstName} {teamMember.lastName}
                  </h4>
                  <img
                    src={getSiteTeamHeadshotArtifact(
                      `${teamMember.firstName.toLowerCase()}.${teamMember.lastName.toLowerCase()}`,
                      "headshot",
                    )}
                    className={
                      getSiteTeamHeadshotArtifact(
                        `${teamMember.firstName.toLowerCase()}.${teamMember.lastName.toLowerCase()}`,
                        "appendCSS",
                      ) + " teamMemberPhoto"
                    }
                    alt="chiropractic-team"
                    height={getSiteTeamHeadshotArtifact(
                      `${teamMember.firstName.toLowerCase()}.${teamMember.lastName.toLowerCase()}`,
                      "imgDimensions.height",
                    )}
                    width={getSiteTeamHeadshotArtifact(
                      `${teamMember.firstName.toLowerCase()}.${teamMember.lastName.toLowerCase()}`,
                      "imgDimensions.width",
                    )}
                  />
                  <div className="chiropractic-team-overlay">
                    <div className="chiropractic-team-des">
                      <h2>
                        {teamMember.firstName} {teamMember.lastName}
                      </h2>
                      <h3>{teamMember.certificationList.join(", ")}</h3>
                    </div>
                  </div>
                </div>
                <p className={"teamMemberDescription"}>
                  {teamMember.description}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
