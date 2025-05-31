import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "../layout/Layout";

import Homepage from "../pages/homepage";
import ErrorPage from "../pages/error";

export function Routing() {
    return (
        <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Homepage />} />
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
        </BrowserRouter>
    )
}