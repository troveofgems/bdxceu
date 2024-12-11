import {apiSlice} from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `/auth/sign-in`,
                method: "POST",
                body: data,
                /*credentials: "include",*/
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: '/auth/sign-up',
                method: "POST",
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `/auth/sign-out`,
                method: "POST"
            })
        }),
        requestPasswordReset: builder.mutation({
            query: (data) => ({
                url: `/auth/forgot-password`,
                method: "POST",
                body: data
            })
        }),
        changePassword: builder.mutation({
            query: ({updates, resetToken}) => ({
                url: `/auth/change-password/${resetToken}`,
                method: "PUT",
                body: updates
            })
        }),
        getUserProfile: builder.query({
            query: () => ({
                url: `/user/profile`,
            })
        }),
        updateUserProfile: builder.mutation({
            query: ({ updates }) => ({
                url: `/user/profile`,
                method: "PUT",
                body: updates
            })
        }),
        getUsers: builder.query({
            query: () => ({
                url: "/admin/users",
            }),
            providesTags: ['Users'],
            keepUnusedDataFor: 5
        }),
        fetchUserById: builder.query({
            query: (userId) => ({
                url: `/admin/users/${userId}`,
                method: "GET"
            }),
            providesTags: ['Users'],
            keepUnusedDataFor: 5
        }),
        updateUserDetails: builder.mutation({
            query: ({userId, updates}) => ({
                url: `/admin/users/${userId}`,
                method: "PUT",
                body: updates
            })
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/admin/users/${userId}`,
                method: "DELETE"
            })
        }),
        getTeam: builder.query({
            query: () => ({
                url: "/team",
            }),
            keepUnusedDataFor: 5
        }),
        getTeamForAdmin: builder.query({
            query: () => ({
                url: "/admin/team",
            }),
            keepUnusedDataFor: 5
        }),
        getTeamMemberById: builder.query({
            query: (teamMemberId) => ({
                url: `/admin/team/${teamMemberId}`,
            }),
            keepUnusedDataFor: 5
        }),
        addTeamMember: builder.mutation({
            query: (teamMemberData) => ({
                url: `/admin/team`,
                method: "POST",
                body: teamMemberData
            })
        }),
        updateTeamMemberDetails: builder.mutation({
            query: ({teamMemberId, updates}) => ({
                url: `/admin/team/${teamMemberId}`,
                method: "PUT",
                body: updates
            })
        }),
        deleteTeamMember: builder.mutation({
            query: (teamMemberId) => ({
                url: `/admin/team/${teamMemberId}`,
                method: "DELETE"
            })
        }),
        updateAccountLockStatus: builder.mutation({
            query: ({userId, updates}) => ({
                url: `/admin/users/${userId}/updateLockStatus`,
                method: "PUT",
                body: updates
            })
        }),
    })
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useRequestPasswordResetMutation,
    useChangePasswordMutation,
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
    useGetUsersQuery,
    useFetchUserByIdQuery,
    useUpdateUserDetailsMutation,
    useGetTeamQuery,
    useGetTeamForAdminQuery,
    useGetTeamMemberByIdQuery,
    useDeleteUserMutation,
    useAddTeamMemberMutation,
    useUpdateTeamMemberDetailsMutation,
    useDeleteTeamMemberMutation,
    useUpdateAccountLockStatusMutation
} = userApiSlice;

export default userApiSlice.reducer;