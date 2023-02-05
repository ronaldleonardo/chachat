import {
    createContext,
    useContext,
    useReducer,
  } from "react";
  
  export const DisplayNoneContext = createContext();
  
  export const DisplayNoneContextProvider = ({ children }) => {
    const INITIAL_STATE = {
      displayNone: false,
    };
  
    const displayNoneReducer = (state, action) => {
      switch (action.type) {
        case "DISPLAY_NONE":
          return {
            displayNone: action.payload,
          };
        default:
          return state;
      }
    };
  
    const [state, dispatchDisplay] = useReducer(displayNoneReducer, INITIAL_STATE);
  
    return (
      <DisplayNoneContext.Provider value={{ displayNone: state, dispatchDisplay }}>
        {children}
      </DisplayNoneContext.Provider>
    );
  };
  