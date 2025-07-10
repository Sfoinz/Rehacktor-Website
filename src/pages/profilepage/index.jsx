import { useOutletContext } from "react-router";
import { useNavigate } from "react-router";
import FormButton from "../../components/buttons/FormButton";

export default function ProfilePage() {
    const { session, loading } = useOutletContext();
    const navigate = useNavigate();

    if (loading) return <p className="text-white">Loading...</p>;

    if (!session) {
        navigate("/login");
        return null;
    }

    const user = session.user;

    return (
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 max-w-xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-6">Il mio profilo</h1>
            <div className="text-gray-300 mb-4">
                <p><strong>Username:</strong> {user.user_metadata.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
            <FormButton variant="primary" onClick={() => navigate("/settings")}>
                Vai alle impostazioni
            </FormButton>
        </div>
    );
}
