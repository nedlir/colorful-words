import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Words } from "../pages/Words";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/words" element={<Words />} />
    </Routes>
  );
}
