import { useState } from "react";
import { useNavigate } from "react-router";
import supabase from "../../supabase/supabase-client";
import {
    ConfirmSchema,
    getErrors,
    getFieldError,
} from "../../lib/validationForm";

import FormButton from "../../components/buttons/FormButton";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const [formState, setFormState] = useState({
        email: "",
        firstName: "",
        lastName: "",
        username: "",
        password: "",
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormSubmitted(true);

        const { success, data, error } = ConfirmSchema.safeParse(formState);

        if (!success) {
            const errors = getErrors(error);
            setFormErrors(errors);
            console.log("Validation errors:", errors);
            return;
        }

        const { email, password, firstName, lastName, username } = data;

        const { error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    username: username,
                },
            },
        });

        if (signUpError) {
            alert("Signing up error 👎🏻!");
            console.error(signUpError);
        } else {
            alert("Signed up 👍🏻!");
            await new Promise((resolve) => setTimeout(resolve, 1000));
            navigate("/");
        }
    };

    const onBlur = (property) => () => {
        const message = getFieldError(property, formState[property]);
        setFormErrors((prev) => ({ ...prev, [property]: message }));
        setTouchedFields((prev) => ({ ...prev, [property]: true }));
    };

    const isInvalid = (property) => {
        if (formSubmitted || touchedFields[property]) {
            return !!formErrors[property];
        }
        return false;
    };

    const setField = (property) => (e) => {
        setFormState((prev) => ({
            ...prev,
            [property]: e.target.value,
        }));
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">Create your account</h1>
                <form onSubmit={onSubmit} noValidate className="space-y-4">

                    {["email", "firstName", "lastName", "username", "password"].map((field) => (
                        <div key={field}>
                            <label htmlFor={field} className="block text-gray-300 text-sm capitalize mb-1">
                                {field === "firstName" ? "First Name" :
                                    field === "lastName" ? "Last Name" :
                                        field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input
                                type={field === "password" ? "password" : "text"}
                                id={field}
                                name={field}
                                value={formState[field]}
                                onChange={setField(field)}
                                onBlur={onBlur(field)}
                                aria-invalid={isInvalid(field)}
                                required
                                className={`w-full px-4 py-2 rounded-lg bg-gray-700 text-white border ${isInvalid(field) ? "border-red-500" : "border-gray-600"
                                    } focus:outline-none focus:ring-2 focus:ring-pink-500`}
                            />
                            {formErrors[field] && (
                                <small className="text-red-400">{formErrors[field]}</small>
                            )}
                        </div>
                    ))}

                    <FormButton variant="primary" className="w-full py-3">
                        Sign Up
                    </FormButton>


                    <p className="text-center text-sm text-gray-400 mt-4">
                        Already have an account?{" "}
                        <a href="/login" className="text-pink-500 hover:underline">
                            Login
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}
