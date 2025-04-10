

import React, { createContext, useReducer } from "react";
import { reducer, initialState } from "../../Pages/Utiles/reducer"; // Assuming the reducer is in a separate file

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  return (
    <DataContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </DataContext.Provider>
  );
};
