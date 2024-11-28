import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";

// Redux Queries & Mutations
import {
    useGetUserProfileQuery,
    useUpdateUserProfileMutation
} from "../../redux/slices/userSlice";

// Reusable Form Field & Validation Imports
import {Input} from "../shared/ReusableFields/Input/Input";
import CustomPhoneInput from "../shared/ReusableFields/PhoneInput/PhoneInput";
import {
    email_validation_readonly,
    first_name_validation,
    last_name_validation,
    middle_initial_validation, phone_validation
} from "../../validations/inputValidations";

// Spinner
import {Preloader} from "../shared/Preloader/Preloader";

// Hardcoded Headshots
import SheilaJackson from "../../assets/images/placeholders/sj.png";
import BeauDaniels from "../../assets/images/team/daniels_headshot_4.jpg";
import EddieStanislawski from "../../assets/images/team/stanislawski_headshot_2.jpg";
import LaurenJung from "../../assets/images/team/jung_headshot.jpg";
import AnonProfile from "../../assets/images/placeholders/anon_profile.png";

// CSS Import For Component
import "./Profile.css";
export const ProfilePage = () => {
    const methods = useForm();
    const navigate = useNavigate();

    const [phoneNumber, setPhoneNumber] = useState("");
    const [changePhone, setChangePhone] = useState(null);

    const
        { user } = useSelector((state) => state.auth),
        isLoggedIn = !!user,
        isStudent = user?.authLevel === "student",
        isTeamMember = user?.authLevel === "team-member",
        isAuditor = user?.authLevel === "auditor",
        isAdmin = user?.authLevel === "admin";


    const { data: userProfile, isLoading: loadingUserProfile, refetch: refetchUserProfile, error: userProfileError } = useGetUserProfileQuery();
    const [updateUserProfile, { isLoading: loadingUpdateUserProfile }] = useUpdateUserProfileMutation();

    const [userProfileLoaded, setUserProfileLoaded] = useState(false);

    useEffect(() => {
        if(!isLoggedIn) return navigate("/");

        console.log("Need to fetch Profile? ", userProfile?.data?._id !== user._id);
        if(!userProfile || (!!userProfile && userProfile?.data?._id !== user._id)) {
            refetchUserProfile();
            console.log("Profile Refetch: ", userProfile);
        }
        if(!!userProfile && (userProfile?.data?._id === user._id)) {
            setUserProfileLoaded(true);
        }
    }, [loadingUserProfile, loadingUpdateUserProfile, userProfileLoaded, userProfile]);

    const onSubmit = async (event) => {
        // this part is for stopping parent forms to trigger their submit
        console.log("Inside onSubmit");
        if (event) {
            // sometimes not true, e.g. React Native
            if (typeof event.preventDefault === 'function') {
                event.preventDefault();
            }
            if (typeof event.stopPropagation === 'function') {
                // prevent any outer forms from receiving the event too
                event.stopPropagation();
            }
        }

        return methods.handleSubmit(async (updates) => {
            let profileUpdates = {
                firstName: updates.first_name,
                middleInitial: updates.middle_initial,
                lastName: updates.last_name
            };

            console.log("Targeting Phone: ", phoneNumber);
            console.log("Phone Number Change? ", changePhone);
            if(changePhone !== null) {
                profileUpdates.phone = changePhone;
            }

            console.log("Push Updates For User: ", profileUpdates);

            try {
                const res = await updateUserProfile({updates: profileUpdates}).unwrap();
                console.log("Res was ", res);
                refetchUserProfile();
            } catch(err) {
                console.log("EMIT ", err);
            }
        })(event);
    };

    return (loadingUserProfile || !userProfileLoaded) ? <Preloader /> : (
        <div className="profileContainer rounded bg-white overflow-x-hidden">
            <div className="row overflow-x-hidden">
                <div className="d-flex justify-content-center overflow-x-hidden">
                    <h2>
                        {isStudent && "My Profile"}
                        {isTeamMember && `Welcome Instructor ${userProfile.data.lastName}`}
                        {isAuditor && `Welcome Auditor ${userProfile.data.lastName}`}
                        {isAdmin && `Welcome Administrator ${userProfile.data.lastName}`}
                    </h2>
                </div>
                <div className="col-md-3 border-right overflow-x-hidden">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <h5 className="font-weight-bold mb-3">{userProfile.data.firstName} {userProfile.data.lastName}</h5>
                        <img
                            className="rounded-circle img-responsive mb-3" width="250" height="250"
                            src={
                                userProfile.data.email === "sheila.jackson@gmail.com" ? SheilaJackson :
                                    userProfile.data.email === "lauren@sportsacademy.us" ? LaurenJung :
                                        userProfile.data.email === "beau@sportsacademy.us" ? BeauDaniels :
                                            userProfile.data.email === "eddie@sportsacademy.us" ? EddieStanislawski :
                                                AnonProfile
                            }
                            alt={`User Avatar For ${userProfile.data.firstName}`}
                        />
                        <h6 className="text-black-50">{userProfile.data.email}</h6>
                    </div>
                </div>
                <div className="col-md-6 border-right form__border overflow-x-hidden">
                    <div className="p-3 py-5">
                        { (loadingUserProfile) ? (
                                <Preloader />
                        ) : (userProfileLoaded) ? (<FormProvider {...methods}>
                            <form onSubmit={e => e.preventDefault()}
                                  noValidate
                                  className="profile-form"
                                  autoComplete="off">
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
                                            onChange={(e) => setPhoneNumber({
                                                ...phoneNumber,
                                                phoneNumber: e
                                            })}
                                        />
                                    </div>
                                </div>
                                <div className="mt-5 w-100 text-end">
                                    {
                                        loadingUpdateUserProfile ? <Preloader/> : (
                                            <button className={"modalButtonAuth buttonAuthLogin"}
                                                    type="sumbit"
                                                    onClick={onSubmit}>Update My Profile
                                            </button>
                                        )
                                    }
                                </div>
                            </form>
                        </FormProvider>) : <Preloader /> }
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="p-3 py-5">
                        <div className="d-flex experience">
                            <h5>{isAdmin && "Site Products"}</h5>
                            <h5>{isTeamMember && "Taught Courses"}</h5>
                            <h5 className={"text-start"}>{isStudent && "Enrolled Courses"}</h5>
                        </div>
                        <div className="col-md-12">
                            {isStudent && userProfileLoaded && (
                                <ol>
                                    {
                                        userProfile.data.subscribedModules.length > 0 ? (
                                            <>
                                                {userProfile.data.subscribedModules.map((subscribedModule, index) => (
                                                    <li key={index}>
                                                        <Link
                                                            to={`/classroom/${(subscribedModule.product === null) ? "support" : subscribedModule.product._id}`}>{(subscribedModule.product === null) ? "Product Removed" : subscribedModule.product.courseTitle}</Link>
                                                    </li>
                                                ))}

                                            </>
                                        ) : <p>Not Currently Enrolled</p>
                                    }
                                </ol>
                            )}
                            {
                                isAdmin && userProfileLoaded && (
                                    <ol>
                                        {
                                            userProfile?.data?.subscribedModules?.length > 0 ? (
                                                <>
                                                    {userProfile?.data?.subscribedModules?.map((subscribedModule, index) => (
                                                        <li key={index}>
                                                            <Link
                                                                to={`/classroom/${subscribedModule.product}`}>{subscribedModule.courseTitle}</Link>
                                                        </li>
                                                    ))}

                                                </>
                                            ) : <p>No Available Courses</p>
                                        }
                                    </ol>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};