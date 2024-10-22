import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { 
    persistStore, 
    persistReducer, 
    FLUSH, 
    REHYDRATE, 
    PAUSE, 
    PERSIST, 
    PURGE, 
    REGISTER 
  } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import loadingSlice from './loadingSlice.js'
import adminSlice from "./adminSlice.js";
import planetSlice from "./planetSlice.js";
import spaceStationSlice from "./spaceStationSlice.js";
import productSlice from "./productSlice.js";
import transactionSlice from "./transactionSlice.js";
import orderSlice from "./orderSlice.js";
import cartSlice from "./cartSlice.js";

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const rootReducer = combineReducers({
    loading: loadingSlice,
    admin: adminSlice,
    planet: planetSlice,
    spaceStation: spaceStationSlice,
    product: productSlice,
    transaction: transactionSlice,
    order: orderSlice,
    cart: cartSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})

export const persistor = persistStore(store);
export default store;