import React from 'react';
import { Provider } from 'react-redux';
import { AppInsightsErrorBoundary } from "@microsoft/applicationinsights-react-js";
import ErrorPage from './pages/error/ErrorPage';
import { reactPlugin } from './helpers/AppInsights';
import { configureStore } from '@reduxjs/toolkit';
import { Reducers } from './reducers/Reducers';
import {v4 as uuidv4} from 'uuid';
import Main from './container/Main';

export const store = configureStore({reducer:Reducers});

sessionStorage.setItem('sessionId',uuidv4());

function App() {
  return (
    <AppInsightsErrorBoundary onError={() => <ErrorPage/>} appInsights={reactPlugin}>
      <Provider store={store}> 
        <Main/>
      </Provider>
    </AppInsightsErrorBoundary>
  );
}

export default App;
