import { Route } from "expo-router";

/** Patht to a route in the file system router directory (`~/app`) */
export type FsRoute = Extract<Route<string>, `/${string}`>
