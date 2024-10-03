import mongoose from "mongoose";
export const connectToDB = async () => {
    const
        {
            DB_USERNAME, DB_PASSWORD, DB_CLUSTER, DB_ID_PATH,
            DB_NAME
        } = process.env,
        uri =
            `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}.${DB_ID_PATH}/` +
            `?retryWrites=true&w=majority&dbName=${DB_NAME}`,
        connectionOptions = {
            serverApi: {
                version: '1',
                strict: true,
                deprecationErrors: true
            }
        };

    try {
        await mongoose
            .connect(uri, connectionOptions)
            .then(async () => {
                await mongoose.connection.db
                    .admin()
                    .command({ ping: 1 })
                    .then(() => console.log("Pinged deployment. Successfully connected to MongoDB!"));

                return mongoose.connection.db;
            });
    } catch(err) {
        console.error(err);
        process.exit(1);
    }
}