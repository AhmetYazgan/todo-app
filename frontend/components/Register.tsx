'use client'

import { isValidConfirmPassword, isValidEmail, isValidPassword, isValidRegisterForm, isValidUsername } from '@/utils/validation';
import { Button, Label, TextInput } from 'flowbite-react';
import { useContext, useState } from 'react';
import { register } from './auth/authentication';
import { useRouter } from 'next/navigation';

export default function Register() {
    const [formValues, setFormValues] = useState({
        username: "",
        email: "",
        password: "",
        repeatPassword: ""
    });

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        repeatPassword: ""
    });

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({
            username: isValidUsername(formValues.username).message,
            email: isValidEmail(formValues.email).message,
            password: isValidPassword(formValues.password).message,
            repeatPassword: isValidConfirmPassword(formValues.password, formValues.repeatPassword).message
        });

        // If there are no validation errors, you can proceed with form submission
        if (isValidRegisterForm(formValues)) {
            register(formValues).then(result => {
                if (result.success) {
                    setFormValues({
                        username: "",
                        email: "",
                        password: "",
                        repeatPassword: ""
                    })
                    router.push('/');
                } else {
                    console.log(result.error);
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    return (
        <section className='min-h-screen flex justify-center items-center'>
            <form className="flex w-11/12 sm:w-[25rem] flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Email" />
                    </div>
                    <TextInput
                        id="email"
                        type="email"
                        name='email'
                        placeholder="example@example.com"
                        autoComplete='email'
                        required
                        shadow
                        onChange={handleChange}
                        value={formValues.email}
                    />
                    {!!errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="username" value="Username" />
                    </div>
                    <TextInput
                        id="username"
                        type="text"
                        name='username'
                        placeholder="exampleuser"
                        autoComplete='username'
                        required
                        shadow
                        onChange={handleChange}
                        value={formValues.username}
                    />
                    {!!errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="Your password" />
                    </div>
                    <TextInput
                        id="password"
                        type="password"
                        name='password'
                        placeholder="********"
                        autoComplete='password'
                        required
                        shadow
                        onChange={handleChange}
                        value={formValues.password}
                    />
                    {!!errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="repeat-password" value="Repeat Password" />
                    </div>
                    <TextInput
                        id="repeat-password"
                        type="password"
                        name='repeatPassword'
                        placeholder="********"
                        autoComplete='password'
                        required
                        shadow
                        onChange={handleChange}
                        value={formValues.repeatPassword}
                    />
                    {!!errors.repeatPassword && <p className="text-red-500 text-xs mt-1">{errors.repeatPassword}</p>}
                </div>
                <Button type="submit">Register</Button>
            </form>
        </section>
    );
}