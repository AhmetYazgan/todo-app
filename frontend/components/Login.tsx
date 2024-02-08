'use client'

import { isValidLoginForm, isValidPassword, isValidUsername } from '@/utils/validation';
import { Button, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { login } from './auth/authentication';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [formValues, setFormValues] = useState({
        username: "",
        password: ""
    });
    const [errors, setErrors] = useState({
        username: "",
        password: ""
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
            password: isValidPassword(formValues.password).message,
        });

        // If there are no validation errors, you can proceed with form submission
        if (isValidLoginForm(formValues)) {
            login(formValues).then(result => {
                if (result.success) {
                    setFormValues({
                        username: "",
                        password: ""
                    })
                    router.push('/');
                } else {
                    console.log(result.error);
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    };

    return (
        <section className='min-h-screen flex justify-center items-center'>
            <form className="flex w-11/12 sm:w-[25rem] flex-col gap-4" onSubmit={handleSubmit}>
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
                        onChange={handleChange}
                        value={formValues.username}
                    />
                    {!!errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="Password" />
                    </div>
                    <TextInput
                        id="password"
                        type="password"
                        name='password'
                        placeholder='********'
                        autoComplete='current-password'
                        required
                        onChange={handleChange}
                        value={formValues.password}
                    />
                    {!!errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
                <Button type="submit">Login</Button>
            </form>
        </section>
    );
}