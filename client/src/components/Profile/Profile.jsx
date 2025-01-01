import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";

// Redux Queries & Mutations
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "../../redux/slices/userSlice";

// Reusable Form Field & Validation Imports
import { Input } from "../shared/ReusableFields/Input/Input";
import CustomPhoneInput from "../shared/ReusableFields/PhoneInput/PhoneInput";
import {
  email_validation_readonly,
  first_name_validation,
  last_name_validation,
  middle_initial_validation,
  phone_validation,
} from "../../validations/inputValidations";

// Spinner
import { Preloader } from "../shared/Preloader/Preloader";

// Hardcoded Headshots
import SheilaJackson from "../../assets/images/placeholders/sj.png";
import BeauDaniels from "../../assets/images/team/daniels_headshot_4.jpg";
import EddieStanislawski from "../../assets/images/team/stanislawski_headshot_2.jpg";
import LaurenJung from "../../assets/images/team/jung_headshot.jpg";
import AnonProfile from "../../assets/images/placeholders/anon_profile.png";

// CSS Import For Component

import { Button, Container, Row, Table } from "react-bootstrap";
import { formatToUsd } from "../../assets/js/printing.utils";
import { formatDate } from "../../utils/field.formatters";

import "./Profile.css";
export const ProfilePage = () => {
  const methods = useForm();
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [changePhone, setChangePhone] = useState(null);

  const { user } = useSelector((state) => state.auth),
    isLoggedIn = !!user,
    isStudent = user?.authLevel === "student",
    isTeamMember = user?.authLevel === "team-member",
    isAuditor = user?.authLevel === "auditor",
    isAdmin = user?.authLevel === "admin";

  const {
    data: userProfile,
    isLoading: loadingUserProfile,
    refetch: refetchUserProfile,
    error: userProfileError,
  } = useGetUserProfileQuery();
  const [updateUserProfile, { isLoading: loadingUpdateUserProfile }] =
    useUpdateUserProfileMutation();

  const [userProfileLoaded, setUserProfileLoaded] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return navigate("/");
    if (
      !userProfile ||
      (!!userProfile && userProfile?.data?._id !== user._id)
    ) {
      refetchUserProfile();
    }
    if (!!userProfile && userProfile?.data?._id === user._id) {
      setUserProfileLoaded(true);
    }
  }, [
    loadingUserProfile,
    loadingUpdateUserProfile,
    userProfileLoaded,
    userProfile,
    userProfileError,
  ]);

  const onSubmit = async (event) => {
    // this part is for stopping parent forms to trigger their submit
    if (event) {
      // sometimes not true, e.g. React Native
      if (typeof event.preventDefault === "function") {
        event.preventDefault();
      }
      if (typeof event.stopPropagation === "function") {
        // prevent any outer forms from receiving the event too
        event.stopPropagation();
      }
    }

    return methods.handleSubmit(async (updates) => {
      let profileUpdates = {
        firstName: updates.first_name,
        middleInitial: updates.middle_initial,
        lastName: updates.last_name,
      };

      if (changePhone !== null) {
        profileUpdates.phone = changePhone;
      }

      try {
        const res = await updateUserProfile({
          updates: profileUpdates,
        }).unwrap();
        refetchUserProfile();
      } catch (err) {
        console.log("EMIT ", err);
      }
    })(event);
  };

  return loadingUserProfile || !userProfileLoaded ? (
    <Preloader />
  ) : (
    <div className="profileContainer rounded bg-white overflow-x-hidden">
      <div className="row overflow-x-hidden">
        <div className="d-flex justify-content-center overflow-x-hidden">
          <h2 className={"mt-5"}>
            {isStudent && "Welcome Back!"}
            {isTeamMember && `Welcome Instructor ${userProfile.data.lastName}`}
            {isAuditor && `Welcome Auditor ${userProfile.data.lastName}`}
            {isAdmin && `Welcome Administrator ${userProfile.data.lastName}`}
          </h2>
        </div>
        <div className={"col-lg-12"}>
          <Container>
            <Row>
              <div className="col-lg-4 col-md-12 border-right overflow-x-hidden">
                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                  <h5 className="font-weight-bold mb-3">
                    {userProfile.data.firstName} {userProfile.data.lastName}
                  </h5>
                  <img
                    className="rounded-circle img-responsive mb-3"
                    width="250"
                    height="250"
                    src={
                      userProfile.data.email === "sheila.jackson@gmail.com"
                        ? `${SheilaJackson}`
                        : userProfile.data.email === "lauren@sportsacademy.us"
                          ? `${LaurenJung}`
                          : userProfile.data.email === "beau@sportsacademy.us"
                            ? `${BeauDaniels}`
                            : userProfile.data.email ===
                                "eddie@sportsacademy.us"
                              ? `${EddieStanislawski}`
                              : `${AnonProfile}`
                    }
                    alt={`User Avatar For ${userProfile.data.firstName}`}
                  />
                  <h6 className="text-black-50">{userProfile.data.email}</h6>
                </div>
              </div>
              <div className="col-lg-8 mt-3 overflow-x-hidden">
                <Container>
                  <div className={"mt-5"}>
                    {loadingUserProfile ? (
                      <Preloader />
                    ) : userProfileLoaded ? (
                      <FormProvider {...methods}>
                        <form
                          onSubmit={(e) => e.preventDefault()}
                          noValidate
                          className="profile-form"
                          autoComplete="off"
                        >
                          <div className="row w-100">
                            <div className="col-lg-5 col-md-12 col-sm-12">
                              <Input
                                {...first_name_validation}
                                value={userProfile.data.firstName}
                              />
                            </div>
                            <div className="col-lg-2 col-md-12  col-sm-12">
                              <Input
                                {...middle_initial_validation}
                                value={userProfile.data.middleInitial}
                              />
                            </div>
                            <div className="col-lg-5 col-md-12  col-sm-12">
                              <Input
                                {...last_name_validation}
                                value={userProfile.data.lastName}
                              />
                            </div>
                          </div>
                          <div className="row w-100">
                            <div className="col-md-12">
                              <Input
                                {...email_validation_readonly}
                                iconName={"mdi:email"}
                                value={userProfile.data.email}
                                disabled={true}
                              />
                            </div>
                            <div className="col-md-12">
                              <CustomPhoneInput
                                {...phone_validation}
                                passVal={changePhone || userProfile.data.phone}
                                onChange={(e) =>
                                  setPhoneNumber({
                                    ...phoneNumber,
                                    phoneNumber: e,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div className="mt-5 w-100 text-end">
                            {loadingUpdateUserProfile ? (
                              <Preloader />
                            ) : (
                              <button
                                className={"modalButtonAuth buttonAuthLogin"}
                                type="sumbit"
                                onClick={onSubmit}
                              >
                                Update My Profile
                              </button>
                            )}
                          </div>
                        </form>
                      </FormProvider>
                    ) : (
                      <Preloader />
                    )}
                  </div>
                </Container>
              </div>
            </Row>
          </Container>
        </div>
        <div className={"col-lg-12 mt-2"}>
          <Container>
            <h2 className={"mb-4"}>
              {isStudent && "Enrolled Courses"}
              {isTeamMember && "Taught Courses"}
              {isAdmin && "Site Products"}
            </h2>
            <Table striped hover responsive className={"table-sm"}>
              <thead>
                <tr key={"table_header"}>
                  <th>Classroom</th>
                  {isStudent && (
                    <>
                      <th>Course Completed On</th>
                      <th>Course Grade</th>
                      <th># Exam Attempts</th>
                    </>
                  )}
                  {isAdmin && (
                    <>
                      <th># of Students</th>
                      <th>Instructor</th>
                      <th>Completion Rate</th>
                    </>
                  )}
                  {isTeamMember && (
                    <>
                      <th># of Students</th>
                      <th>Completion Rate</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {userProfile.data.subscribedModules.length > 0 &&
                  userProfile.data.subscribedModules?.map((module, index) => (
                    <>
                      {isStudent && (
                        <tr key={`rowEntry_${module._id}`}>
                          <td>
                            <Link
                              key={`navigateTo_${module._id}`}
                              to={`/classroom/${module.product === null ? "support" : module.product._id}`}
                            >
                              {module.product === null
                                ? "Product Removed"
                                : module.product.courseTitle}
                            </Link>
                          </td>
                          {module.product === null ? (
                            <td>No Longer Accessible</td>
                          ) : (
                            <td>
                              {!module?.studentRecord
                                ? "-"
                                : formatDate(
                                    module.studentRecord.courseCompletedAt,
                                  )}
                            </td>
                          )}
                          <td>
                            {!module?.studentRecord
                              ? "-"
                              : module.studentRecord.courseGrade}
                          </td>
                          <td>
                            {!module?.studentRecord
                              ? "0"
                              : module.studentRecord.examAttempts.length}
                          </td>
                          <td>
                            <Button
                              variant={"light"}
                              className={"btn-sm"}
                              onClick={() => null}
                            >
                              View Exam History
                            </Button>
                          </td>
                        </tr>
                      )}
                      {isAdmin && (
                        <tr key={module._id}>
                          <td>
                            <Link
                              key={`navigateTo_${module._id}`}
                              to={`/classroom/${module.product}`}
                            >
                              {module.courseTitle}
                            </Link>
                          </td>
                          <td>{module.courseEnrollments}</td>
                          <td>{module.courseInstructor}</td>
                          <td>0.0%</td>
                        </tr>
                      )}
                      {isTeamMember && (
                        <tr key={module._id}>
                          <td>
                            <Link
                              key={`navigateTo_${module._id}`}
                              to={`/classroom/${module.product}`}
                            >
                              {module.courseTitle}
                            </Link>
                          </td>
                          <td>{module.courseEnrollments}</td>
                          <td>0.0%</td>
                        </tr>
                      )}
                    </>
                  ))}
              </tbody>
            </Table>
            {userProfile.data.subscribedModules.length === 0 && (
              <h4 className={"text-center mt-3 mb-5"}>No Data Yet!</h4>
            )}
          </Container>
        </div>
      </div>
    </div>
  );
};
