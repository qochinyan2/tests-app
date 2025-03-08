import { Site, Test } from "@app/scripts/types";
import store from "./store";

export interface initialStateType {
  sites: Site[];
  tests: Test[];
  status: string;
  error: null | string | undefined;
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
