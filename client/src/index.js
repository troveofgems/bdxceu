import * as React from "react";
import * as ReactDOM from "react-dom/client";

import {RouterProvider} from "react-router-dom";
import ApplicationRouter from "./router/root";

const rootAnchor = document.getElementById('root') || process.exit(1);

ReactDOM
    .createRoot(rootAnchor)
    .render(
        <React.StrictMode>
            <RouterProvider router={ApplicationRouter} />
        </React.StrictMode>
    );