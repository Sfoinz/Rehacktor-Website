import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "../layout/Layout";



import Homepage from "../pages/homepage";
import ErrorPage from "../pages/error";
import GenrePage from "../pages/genrepage";

function Routing() {
    return (
 
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Homepage />} />
                    <Route path="*" element={<ErrorPage />} />
                    <Route path="/games/:genre" element={<GenrePage />} />
                </Route>
            </Routes>
 
    )
}

export default Routing;