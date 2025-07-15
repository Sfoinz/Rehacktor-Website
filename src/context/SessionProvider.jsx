import { useState, useEffect } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "./SessionContext";

export default function SessionProvider({ children }) {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            const { data } = await supabase.auth.getSession();
            setSession(data.session);
            setLoading(false);
        };

        getSession();

        const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => {
            subscription?.unsubscribe?.();
        };
    }, []);

    return (
        <SessionContext.Provider value={{ session, setSession, loading }}>
            {children}
        </SessionContext.Provider>
    );
}
