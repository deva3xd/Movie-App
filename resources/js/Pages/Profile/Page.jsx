import { useForm, usePage } from '@inertiajs/react';
import { useRef } from 'react';
import { Toaster, toast } from 'sonner'
import MainLayout from '@/layouts/MainLayout';
import DeleteUserForm from './partials/DeleteUserForm';
import InputError from '@/components/InputError';

export default function Page({ auth, mustVerifyEmail, status }) {
    const userProfile = auth ? auth.user : null;

    const user = usePage().props.auth.user;
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, patch, errors } = useForm({
        name: user.name,
        email: user.email,
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
        
        const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Profile' }), 1000));
        toast.promise(promise, {
        loading: 'Loading...',
        success: (data) => {
            return `${data.name} has been added`;
        },
        error: 'Error',
        });
    };

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <MainLayout title="Profile" user={userProfile}>
            <div className="pt-1 px-1 bg-white">
                <div className='bg-custom-primary text-white text-xl font-bold p-6'>PROFILE</div>
                <div className="flex gap-1">
                    <div className='bg-custom-primary text-white text-xl font-bold p-6 mt-1 w-1/2'>
                        <h3 className='text-lg'>Profile Information</h3>
                        <p className='text-sm'>Update your account's profile information and email address.</p>
                        <Toaster richColors />
                        <form onSubmit={submit}>
                            <label className="form-control w-full max-w-xs mt-5">
                                <div className="label p-0">
                                    <span className="label-text">Name</span>
                                </div>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" id="name" onChange={(e) => data('name', e.target.value)} required />
                                <InputError className="mt-2" message={errors.name} />
                            </label>
                            <label className="form-control w-full max-w-xs mt-5">
                                <div className="label p-0">
                                    <span className="label-text">Email</span>
                                </div>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" id="email" onChange={(e) => data('email', e.target.value)} required />
                                <InputError className="mt-2" message={errors.email} />
                            </label>
                            <button className="btn bg-blue-600 hover:bg-blue-400 btn-sm mt-5 font-semibold text-xs text-white uppercase">Save</button>
                            {mustVerifyEmail && user.email_verified_at === null && (
                                <div>
                                    <p className="text-sm mt-2 text-gray-800">
                                        Your email address is unverified.
                                        <Link
                                            href={route('verification.send')}
                                            method="post"
                                            as="button"
                                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Click here to re-send the verification email.
                                        </Link>
                                    </p>

                                    {status === 'verification-link-sent' && (
                                        <div className="mt-2 font-medium text-sm text-green-600">
                                            A new verification link has been sent to your email address.
                                        </div>
                                    )}
                                </div>
                            )}
                        </form>
                    </div>

                    <div className='bg-custom-primary text-white text-xl font-bold p-6 mt-1 w-1/2'>
                        <h3 className='text-lg'>Update Password</h3>
                        <p className='text-sm'>Ensure your account is using a long, random password to stay secure/</p>
                        <form onSubmit={updatePassword}>
                            <label className="form-control w-full max-w-xs mt-5">
                                <div className="label p-0">
                                    <span className="label-text">Current Password</span>
                                </div>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" id="current_password" onChange={(e) => data('current_password', e.target.value)} required />
                                <InputError message={errors.current_password} className="mt-2" />
                            </label>
                            <label className="form-control w-full max-w-xs mt-5">
                                <div className="label p-0">
                                    <span className="label-text">New Password</span>
                                </div>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" id="new_password" onChange={(e) => data('password', e.target.value)} required />
                                <InputError message={errors.password} className="mt-2" />
                            </label>
                            <label className="form-control w-full max-w-xs mt-5">
                                <div className="label p-0">
                                    <span className="label-text">Confirm Password</span>
                                </div>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" id="password_confirmation" onChange={(e) => data('password_confirmation', e.target.value)} required />
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </label>
                            <button className="btn bg-blue-600 hover:bg-blue-400 btn-sm mt-5 font-semibold text-xs text-white uppercase">Save</button>
                        </form>
                    </div>
                </div>

                <div className="bg-custom-primary text-white text-xl font-bold p-6 mt-1">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </MainLayout>
    );
}
