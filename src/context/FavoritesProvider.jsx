import { createContext, useCallback, useContext, useEffect, useState } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "./SessionContext";

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const { session } = useContext(SessionContext);
    const [favorites, setFavorites] = useState([]);

    const getFavorites = useCallback(async () => {
        if (!session?.user) return;
        const { data, error } = await supabase
            .from("favorites")
            .select("*")
            .eq("user_id", session.user.id);
        if (error) {
            console.error("Errore nel recupero preferiti:", error.message);
        } else {
            setFavorites(data);
        }
    }, [session]);

    const addFavorite = async (game) => {
        if (!session?.user) return;
        const { error } = await supabase.from("favorites").insert([
            {
                user_id: session.user.id,
                game_id: game.id,
                game_name: game.name,
                game_image: game.background_image,
                updated_at: new Date(),
            },
        ]);
        if (!error) getFavorites();
    };

    const removeFavorite = async (gameId) => {
        if (!session?.user) return;
        const { error } = await supabase
            .from("favorites")
            .delete()
            .eq("game_id", gameId)
            .eq("user_id", session.user.id);
        if (!error) getFavorites();
    };

    useEffect(() => {
        getFavorites();
    }, [getFavorites]);

    return (
        <FavoritesContext.Provider
            value={{ favorites, getFavorites, addFavorite, removeFavorite }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoritesContext);
}
