import { Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";

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

import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import ResetPassword from "./pages/Authentication/ResetPassword";
import ChangePassword from "./pages/Authentication/ChangePassword";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import FieldJournal from "./pages/FieldJournal";

import { AuthContextProvider } from "./context/AuthContext";
import { LoadingProvider } from "./context/LoadingContext";

import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import AnimalClassPage from "./pages/AnimalClassPage";
import AnimalSpeciesPage from "./pages/AnimalSpeciesPage";

setupIonicReact();

const App: React.FC = () => (
  <LoadingProvider>
    <IonApp>
      <AuthContextProvider>
        <IonReactRouter>
          <Menu />
          <IonTabs>
            <IonRouterOutlet id="main-content">
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/change-password">
                <ChangePassword />
              </Route>
              <Route exact path="/reset-password">
                <ResetPassword />
              </Route>
              <Route exact path="/register">
                <Register />
              </Route>
              <Route exact path="/field-journal">
                <FieldJournal />
              </Route>
              <Route exact path="/about-us">
                <AboutUs />
              </Route>
              <Route exact path="/contact-us">
                <ContactUs />
              </Route>
              <Route exact path="/animal-class/:classSlug/">
                <AnimalClassPage />
              </Route>
              <Route exact path="animal-class/:classSlug/:speciesSlug">
                <AnimalSpeciesPage />
              </Route>
            </IonRouterOutlet>
            <Navbar />
          </IonTabs>
        </IonReactRouter>
      </AuthContextProvider>
    </IonApp>
  </LoadingProvider>
);

export default App;
