import { useState } from "react";
import { useNavigate } from "react-router";
import supabase from "../../supabase/supabase-client";
import { z } from "zod";
import FormButton from "../../components/buttons/FormButton";

const LoginSchema = z.object({
    email: z.string().email("Inserisci un'email valida"),
    password: z.string().min(6, "La password deve avere almeno 6 caratteri"),
});

export default function LoginPage() {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({ email: "", password: "" });
    const [formErrors, setFormErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const setField = (field) => (e) => {
        setFormState((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const result = LoginSchema.safeParse(formState);
        if (!result.success) {
            const errors = result.error.flatten().fieldErrors;
            setFormErrors(errors);
            setSubmitting(false);
            return;
        }

        const { error } = await supabase.auth.signInWithPassword({
            email: formState.email,
            password: formState.password,
        });

        if (error) {
            alert("Login failed 👎🏻");
            console.error(error);
        } else {
            alert("Logged in 👍🏻");
            navigate("/");
        }

        setSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">Welcome back</h1>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-gray-300 text-sm mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formState.email}
                            onChange={setField("email")}
                            className={`w-full px-4 py-2 rounded-lg bg-gray-700 text-white border ${formErrors.email ? "border-red-500" : "border-gray-600"
                                } focus:outline-none focus:ring-2 focus:ring-pink-500`}
                            required
                        />
                        {formErrors.email && (
                            <small className="text-red-400">{formErrors.email}</small>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-300 text-sm mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={formState.password}
                            onChange={setField("password")}
                            className={`w-full px-4 py-2 rounded-lg bg-gray-700 text-white border ${formErrors.password ? "border-red-500" : "border-gray-600"
                                } focus:outline-none focus:ring-2 focus:ring-pink-500`}
                            required
                        />
                        {formErrors.password && (
                            <small className="text-red-400">{formErrors.password}</small>
                        )}
                    </div>

                    <FormButton
                        type="submit"
                        variant="primary"
                        className="w-full py-3 text-center"
                        disabled={submitting}
                    >
                        {submitting ? "Logging in..." : "Login"}
                    </FormButton>

                    <p className="text-center text-sm text-gray-400 mt-4">
                        Don't have an account?{" "}
                        <a href="/register" className="text-pink-500 hover:underline">
                            Register
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}
