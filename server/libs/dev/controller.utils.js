export function buildAPIBodyResponse(callSignature) {
    const IS_NOT_PRODUCTION = process.env.NODE_ENV !== "prod";
    let baseObject = {
        success: null,
        error: null,
        data: null
    }

    if (IS_NOT_PRODUCTION) {
        baseObject.callSignature = callSignature;
    }

    return baseObject;
}