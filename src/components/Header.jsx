import { useEffect, useState } from "react";
import supabase from "../supabase/supabase-client";
import Navbar from "./Navbar";

export default function Header() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        setSession(null);
      } else {
        setSession(data.session);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 justify-between items-center">
        <Navbar session={session} />
      </div>
    </header>
  );
}
