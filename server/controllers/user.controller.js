// User Controller Actions
export const testController = (req, res, next) => {
    return res.status(200).json({"message": "Server Reached"});
}