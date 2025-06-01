import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "../layout/Layout";

import Homepage from "../pages/homepage";
import ErrorPage from "../pages/error";

function Routing() {
    return (
 
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Homepage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Route>
            </Routes>
 
    )
}

export default Routing;