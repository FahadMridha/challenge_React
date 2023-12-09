import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./slices/task.slice";

export default configureStore({
  reducer: {
    task: taskSlice,
  },
});
