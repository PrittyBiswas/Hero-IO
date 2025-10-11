import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Apps from "../pages/Apps";
import Installation from "../pages/Installation";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/NotFound";
import AppDetails from "../pages/AppDetails";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/apps" element={<Apps />} />
                    <Route path="/apps/:id" element={<AppDetails />} />
                    <Route path="/installation" element={<Installation />} />
                </Route>

                {/* 404 Page */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
