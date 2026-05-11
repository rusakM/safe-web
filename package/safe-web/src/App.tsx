import { Route, Routes } from "react-router-dom";
import { useTolgee } from "@tolgee/react";

import "./App.css";
import { constantsUrls } from "./helpers/constants";
import RootContainer from "./components/root-container/root-container";
import LandingPage from "./pages/landing-page/landing-page";




function App() {
    const tolgee = useTolgee(["language"]);

    return (
        <div lang={tolgee.getLanguage()}>
            <RootContainer>
                <Routes>
                    <Route element={<LandingPage />} path={constantsUrls.LandingPage.main} />
                </Routes>
            </RootContainer>
        </div>
    );
}

export default App;
