import { Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  setupIonicReact,
  useIonRouter,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React, { useState } from "react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */

// import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/global.css";

import Home from "./pages/Home";
import LoginModal from "./pages/Authentication/LoginModal";
import Register from "./pages/Authentication/Register";
import ResetPassword from "./pages/Authentication/ResetPassword";
import ChangePassword from "./pages/Authentication/ChangePassword";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import FieldJournal from "./pages/FieldJournal";
import AddSighting from "./pages/AddSighting";
import AnimalClassPage from "./pages/AnimalClassPage";
import AnimalSpeciesPage from "./pages/AnimalSpeciesPage";
import IdentifyPenguins from "./pages/IdentifyPenguins";
import ConfirmSighting from "./pages/ConfirmSighting";

import { AuthContextProvider, UserAuth } from "./context/AuthContext";
import { LoadingProvider } from "./context/LoadingContext";

import Menu from "./components/Menu";
import Navbar from "./components/Navbar";

setupIonicReact();

const App: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <LoadingProvider>
      <IonApp>
        <AuthContextProvider>
          <IonReactRouter>
            <Menu />
            <IonTabs>
              <IonRouterOutlet id="main-content">
                <Route exact path="/" component={Home} />
                <Route exact path="/field-journal">
                  <FieldJournal onShowLoginModal={() => setIsLoginOpen(true)} />
                </Route>
                <Route exact path="/add-sighting" component={AddSighting} />
                <Route exact path="/add-sighting/:speciesId" component={ConfirmSighting} />
                <Route exact path="/about-us" component={AboutUs} />
                <Route exact path="/contact-us" component={ContactUs} />
                <Route exact path="/change-password" component={ChangePassword} />
                <Route
                  exact
                  path="/animals/:classSlug/"
                  component={AnimalClassPage}
                />
                <Route
                  exact
                  path="/animals/:classSlug/:speciesId"
                  component={AnimalSpeciesPage}
                />
                <Route exact path="/identify-penguins" component={IdentifyPenguins} />
              </IonRouterOutlet>
              <Navbar/>
            </IonTabs>
            <LoginModal isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />
          </IonReactRouter>
        </AuthContextProvider>
      </IonApp>
    </LoadingProvider>
  );
};

export default App;
