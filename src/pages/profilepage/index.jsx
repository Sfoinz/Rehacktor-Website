import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import FormButton from "../../components/buttons/FormButton";
import SessionContext from "../../context/SessionContext";

export default function ProfilePage() {
    const { session } = useContext(SessionContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!session) {
            navigate("/login");
        }
    }, [session, navigate]);

    if (!session) return <p className="text-white">Loading...</p>;

    const user = session.user;

    return (
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 max-w-xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-6">Il mio profilo</h1>
            <div className="text-gray-300 mb-4 space-y-2">
                <p><strong>Username:</strong> {user.user_metadata.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
            <FormButton variant="primary" onClick={() => navigate("/account")}>
                Modifica profilo
            </FormButton>
        </div>
    );
}
