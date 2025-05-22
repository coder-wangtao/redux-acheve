import { configureStore } from "../my-rtk-store";

import counterReducer from "./counterSlice.js";

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
