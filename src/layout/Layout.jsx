import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import supabase from "../supabase/supabase-client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

function Layout() {

    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            const { data } = await supabase.auth.getSession();
            setSession(data.session);
            setLoading(false);
        };

        getSession();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setLoading(false);
        });
        return () => listener.subscription.unsubscribe();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col">
            <Header />

            <div className="flex flex-1">
                <Sidebar />

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <Outlet context={{ session, loading }} />
                </main>
            </div>

            <Footer />
        </div>
    );
}

export default Layout;
