import React, { useReducer, useMemo, useContext } from "react";

// Define the types for the state
interface State {
  openSidenav: boolean;
  sidenavType: string;
  sidenavColor: string;
  transparentNavbar: boolean;
  animateSidenav: boolean;
  fixedNavbar: boolean;
  openConfigurator: boolean;
}

// Define the action types
type Action =
  | { type: "OPEN_SIDENAV"; value: boolean }
  | { type: "SIDENAV_TYPE"; value: string }
  | { type: "ANIMATE_SIDENAV"; value: boolean }
  | { type: "SIDENAV_COLOR"; value: string }
  | { type: "TRANSPARENT_NAVBAR"; value: boolean }
  | { type: "FIXED_NAVBAR"; value: boolean }
  | { type: "OPEN_CONFIGURATOR"; value: boolean };

// Define the initial state
const initialState: State = {
  openSidenav: false,
  sidenavColor: "dark",
  sidenavType: "white",
  transparentNavbar: true,
  animateSidenav: true,
  fixedNavbar: false,
  openConfigurator: false,
};

// Create the reducer function with typed state and actions
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

// Create the context with types
interface _IConfiguratorContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const ConfiguratorContext =
  React.createContext<_IConfiguratorContextType | null>(null);
ConfiguratorContext.displayName = "ConfiguratorContext";

// Create the provider component with types
const ConfiguratorProvider: React.FC<_IChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <ConfiguratorContext.Provider value={value}>
      {children}
    </ConfiguratorContext.Provider>
  );
};

// Custom hook to use the Configurator context
export const useConfigurator = (): _IConfiguratorContextType => {
  const context = useContext(ConfiguratorContext);
  if (!context) {
    throw new Error(
      "useConfigurator must be used within a ConfiguratorProvider"
    );
  }
  return context;
};

// Action creators with types
export const setOpenSidenav = (
  dispatch: React.Dispatch<Action>,
  value: boolean
) => dispatch({ type: "OPEN_SIDENAV", value });

export const setAnimateSidenav = (
  dispatch: React.Dispatch<Action>,
  value: boolean
) => dispatch({ type: "ANIMATE_SIDENAV", value });

export const setSidenavType = (
  dispatch: React.Dispatch<Action>,
  value: string
) => dispatch({ type: "SIDENAV_TYPE", value });

export const setSidenavColor = (
  dispatch: React.Dispatch<Action>,
  value: string
) => dispatch({ type: "SIDENAV_COLOR", value });

export const setTransparentNavbar = (
  dispatch: React.Dispatch<Action>,
  value: boolean
) => dispatch({ type: "TRANSPARENT_NAVBAR", value });

export const setFixedNavbar = (
  dispatch: React.Dispatch<Action>,
  value: boolean
) => dispatch({ type: "FIXED_NAVBAR", value });

export const setOpenConfigurator = (
  dispatch: React.Dispatch<Action>,
  value: boolean
) => dispatch({ type: "OPEN_CONFIGURATOR", value });

export default ConfiguratorProvider;
