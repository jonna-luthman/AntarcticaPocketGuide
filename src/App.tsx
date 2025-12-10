import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonFab,
  IonFabButton,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { personOutline, homeOutline, add } from "ionicons/icons";
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
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import ResetPassword from "./pages/Authentication/ResetPassword";
import { AuthContextProvider } from "./context/AuthContext";
import { LoadingProvider } from "./context/LoadingContext";
import ChangePassword from "./pages/Authentication/ChangePassword";
import FieldJournal from "./pages/FieldJournal";
import Menu from "./components/Menu";

setupIonicReact();

const App: React.FC = () => (
  <LoadingProvider>
    <IonApp>
      <AuthContextProvider>
        <Menu />
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet id="main-content">
              <Route exact path="/home">
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
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route exact path="/field-journal">
                <FieldJournal />
              </Route>
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={homeOutline} color="dark" />
              </IonTabButton>
              <IonTabButton tab="profile" href="/field-journal">
                <IonIcon icon={personOutline} color="dark" />
              </IonTabButton>
            </IonTabBar>

            <IonFab vertical="bottom" horizontal="center" edge={true}>
              <IonFabButton>
                <IonIcon icon={add} color="dark" />
              </IonFabButton>
            </IonFab>
          </IonTabs>
        </IonReactRouter>
      </AuthContextProvider>
    </IonApp>
  </LoadingProvider>
);

export default App;
