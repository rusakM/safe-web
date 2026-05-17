import { Navigate,Route, Routes } from "react-router-dom";
import { lazy } from "react";
import { useTolgee } from "@tolgee/react";

import "./App.css";
import { constantsUrls } from "./helpers/constants";
import RootContainer from "./components/root-container/root-container";
import RedirectAfterLogin from "./components/redirect-after-login/redirect-after-login";
import LandingPage from "./pages/landing-page/landing-page";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkCurrentUser } from "./helpers/events.functions";

const Confirm = lazy(() => import("./pages/confirm/confirm"));
const FillRegisterData = lazy(() => import("./pages/fill-register-data/fill-register-data"));
const SignUp = lazy(() => import("./pages/sign-up/sign-up"));
const SignIn = lazy(() => import("./pages/sign-in/sign-in"));
const EditProfile = lazy(() => import("./pages/edit-profile/edit-profile"));

function App() {
    const tolgee = useTolgee(["language"]);
    const currentUser = useSelector(selectCurrentUser);

    return (
        <div lang={tolgee.getLanguage()} className="app">
            <RootContainer>
                <Routes>
                    <Route element={<LandingPage />} path={constantsUrls.LandingPage.main} />
                    <Route element={<RedirectAfterLogin currentUser={currentUser} Component={SignIn}/>} path={constantsUrls.LandingPage.signIn} />
                    <Route element={<RedirectAfterLogin currentUser={currentUser} Component={SignUp} />} path={constantsUrls.LandingPage.signUp} />
                    <Route element={<RedirectAfterLogin currentUser={currentUser} Component={Confirm} />} path={constantsUrls.LandingPage.confirm} />
                    <Route element={((currentUser && currentUser?.firstName) || !currentUser)
                        ? <Navigate to={constantsUrls.LandingPage.main } replace={true} />
                        : <FillRegisterData /> } 
                        path={constantsUrls.LandingPage.fillRegisterData}
                    />
                    <Route element={checkCurrentUser(currentUser) 
                        ? <EditProfile /> 
                        : <Navigate to={constantsUrls.LandingPage.main} replace={true} />}
                        path={constantsUrls.Main.myProfile} 
                    />
                </Routes>
            </RootContainer>
        </div>
    );
}

export default App;
