import { Outlet } from "react-router";

function Layout() {

    return (
        <div className="style-layout-system">
            <nav className="style-header">HEADER</nav>
            <div className="style-main-content">
                <Outlet />
            </div>
            <footer className="style-footer">Footer</footer>
        </div>
    )

}