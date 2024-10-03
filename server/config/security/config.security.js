import helmet from 'helmet';
import hpp from 'hpp';

export const applySecurityStandards = (app) => {
    app.use(helmet());
    app.use(hpp({}));

    return app;
}