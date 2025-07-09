import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "../layout/Layout";
import GamePage from "../pages/gamepage";
import SearchPage from "../pages/searchpage";

import Homepage from "../pages/homepage";
import ErrorPage from "../pages/error";
import GenrePage from "../pages/genrepage";
import RegisterPage from "../pages/register";

function Routing() {
    return (
 
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Homepage />} />
                    <Route path="*" element={<ErrorPage />} />
                    <Route path="/games/:genre" element={<GenrePage />} />
                    <Route path="/games/:slug/:id" element={<GamePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/register" element={<RegisterPage />}/>
                </Route>
            </Routes>
 
    )
}

export default Routing;