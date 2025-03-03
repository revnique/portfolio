import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./root.reducer";
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from "./root.epic";

const epicMiddleware = createEpicMiddleware();
export default configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({serializableCheck: false}).concat(epicMiddleware)
});

epicMiddleware.run(rootEpic as any);