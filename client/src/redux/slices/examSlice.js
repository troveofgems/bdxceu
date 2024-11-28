import {apiSlice} from "./apiSlice";

export const examApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getExamList: builder.query({
            query: () => ({
                url: "/admin/exams",
            }),
            providesTags: ['Exams'],
            keepUnusedDataFor: 5
        }),
        getExamById: builder.query({
            query: (examId) => ({
                url: `/exam/${examId}`,
            }),
            providesTags: ['Exams'],
            keepUnusedDataFor: 5
        }),
        createExam: builder.mutation({
            query: (examData) => ({
                url: `/admin/exam`,
                method: "POST",
                body: examData
            })
        }),
        updateExam: builder.mutation({
            query: ({examId, updates}) => ({
                url: `/admin/exam/${examId}`,
                method: "PUT",
                body: {...updates}
            })
        }),
        deleteExam: builder.mutation({
            query: (examId) => ({
                url: `/admin/exam/${examId}`,
                method: "DELETE"
            })
        }),
    })
});

export const {
    useGetExamListQuery,
    useGetExamByIdQuery,
    useCreateExamMutation,
    useUpdateExamMutation,
    useDeleteExamMutation
} = examApiSlice;

export default examApiSlice.reducer;