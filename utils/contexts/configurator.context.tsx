import React, {
  useReducer,
  useMemo,
  useContext,
  useEffect,
  useCallback,
} from "react";
import useLocalStorage from "../hooks/useStorage";

interface State {
  openSidenav: boolean;
  sidenavType: string;
  sidenavColor: string;
  transparentNavbar: boolean;
  animateSidenav: boolean;
  fixedNavbar: boolean;
  openConfigurator: boolean;
}

type Action =
  | { type: "OPEN_SIDENAV"; value: boolean }
  | { type: "SIDENAV_TYPE"; value: string }
  | { type: "ANIMATE_SIDENAV"; value: boolean }
  | { type: "SIDENAV_COLOR"; value: string }
  | { type: "TRANSPARENT_NAVBAR"; value: boolean }
  | { type: "FIXED_NAVBAR"; value: boolean }
  | { type: "OPEN_CONFIGURATOR"; value: boolean };

const initialState: State = {
  openSidenav: true,
  sidenavColor: "dark",
  sidenavType: "white",
  transparentNavbar: true,
  animateSidenav: false,
  fixedNavbar: false,
  openConfigurator: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "OPEN_SIDENAV":
      return { ...state, openSidenav: action.value };
    case "SIDENAV_TYPE":
      return { ...state, sidenavType: action.value };
    case "SIDENAV_COLOR":
      return { ...state, sidenavColor: action.value };
    case "ANIMATE_SIDENAV":
      return { ...state, animateSidenav: action.value };
    case "TRANSPARENT_NAVBAR":
      return { ...state, transparentNavbar: action.value };
    case "FIXED_NAVBAR":
      return { ...state, fixedNavbar: action.value };
    case "OPEN_CONFIGURATOR":
      return { ...state, openConfigurator: action.value };
    default:
      throw new Error(`Unhandled action type: ${(action as Action).type}`);
  }
}

interface _IConfiguratorContextType {
  state: State;
  setOpenSidenav: (value: boolean) => void;
  setSidenavType: (value: string) => void;
  setAnimateSidenav: (value: boolean) => void;
  setSidenavColor: (value: string) => void;
  setTransparentNavbar: (value: boolean) => void;
  setFixedNavbar: (value: boolean) => void;
  setOpenConfigurator: (value: boolean) => void;
}

const ConfiguratorContext =
  React.createContext<_IConfiguratorContextType | null>(null);
ConfiguratorContext.displayName = "ConfiguratorContext";

const ConfiguratorProvider: React.FC<_IChildren> = ({ children }) => {
  // const [configurationData, setConfigurationData] = useLocalStorage<State>(
  //   "configurationData",
  //   initialState
  // );

  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffect(() => {
  //   setConfigurationData(state);
  // }, [state, setConfigurationData]);

  const setOpenSidenav = useCallback(
    (value: boolean) => dispatch({ type: "OPEN_SIDENAV", value }),
    []
  );
  const setSidenavType = useCallback(
    (value: string) => dispatch({ type: "SIDENAV_TYPE", value }),
    []
  );
  const setAnimateSidenav = useCallback(
    (value: boolean) => dispatch({ type: "ANIMATE_SIDENAV", value }),
    []
  );
  const setSidenavColor = useCallback(
    (value: string) => dispatch({ type: "SIDENAV_COLOR", value }),
    []
  );
  const setTransparentNavbar = useCallback(
    (value: boolean) => dispatch({ type: "TRANSPARENT_NAVBAR", value }),
    []
  );
  const setFixedNavbar = useCallback(
    (value: boolean) => dispatch({ type: "FIXED_NAVBAR", value }),
    []
  );
  const setOpenConfigurator = useCallback(
    (value: boolean) => dispatch({ type: "OPEN_CONFIGURATOR", value }),
    []
  );

  const value = useMemo(
    () => ({
      state,
      setOpenSidenav,
      setSidenavType,
      setAnimateSidenav,
      setSidenavColor,
      setTransparentNavbar,
      setFixedNavbar,
      setOpenConfigurator,
    }),
    [
      state,
      setOpenSidenav,
      setSidenavType,
      setAnimateSidenav,
      setSidenavColor,
      setTransparentNavbar,
      setFixedNavbar,
      setOpenConfigurator,
    ]
  );

  return (
    <ConfiguratorContext.Provider value={value}>
      {children}
    </ConfiguratorContext.Provider>
  );
};

export const useConfigurator = (): _IConfiguratorContextType => {
  const context = useContext(ConfiguratorContext);
  if (!context) {
    throw new Error(
      "useConfigurator must be used within a ConfiguratorProvider"
    );
  }
  return context;
};

export default ConfiguratorProvider;
