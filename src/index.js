import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import MovieSearch from "./components/MovieSearch";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <MovieSearch />
  </StrictMode>
);
