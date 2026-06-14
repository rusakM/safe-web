import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { TolgeeProvider } from "@tolgee/react";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import tolgeeConfig from "./translations/index.ts";

import "./index.css";
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import App from "./App.tsx";
import Spinner from "./components/spinner/spinner.component.tsx";

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <BrowserRouter>
            <TolgeeProvider tolgee={tolgeeConfig} fallback={<Spinner/>}>
                <Suspense fallback={<Spinner />}>
                    <App />
                </Suspense>
            </TolgeeProvider>
        </BrowserRouter>
    </Provider>
);
