import {useEffect, useState} from 'react';
import {sendPasswordResetEmail} from 'firebase/auth';
import {auth} from '../firebase-config';

function ResetPassword() {

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isHidden, setIsHidden] = useState(false);

    const isInvalid = email === '';

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const sendPasswordReset = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            alert("Password reset link sent!");
        } catch (error) {
            setError(error);
            console.error(error);
            alert(error.message);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        sendPasswordReset(email);
        console.log(email)
        setIsHidden(true);
    }

    useEffect(() => {
        document.title = 'Reset Password - ShowOff';
    }, [] );

  return (
    <div className='bg-amber-50'>
            <div className='container flex mx-auto max-w-md items-center h-screen'>
                <div className='flex flex-col'>
                    <div className='flex flex-col items-center bg-white p-4 border-2 border-amber-400 rounded mb-4'>

                        {error && <p className='mb-4 text-xs text-red-500 text-center'>{error}</p>}

                        {!isHidden && 
                        <div>
                            <p className='mb-4'>Enter the email address associated with your account:</p>
                            <form onSubmit={handleSubmit} method='GET'>
                                <input 
                                    aria-label='Enter your email address'
                                    className='text-sm w-full mr-3 py-5 px-4 h-2 border-2 border-yellow-800 rounded mb-2'
                                    type='email'
                                    name='email'
                                    placeholder='Email Address'
                                    onChange={handleEmailChange}
                                    value={email}
                                />
                                <button
                                    type='submit'
                                    className={`bg-amber-400 text-white w-full rounded h-8 font-bold ${isInvalid && 'cursor-not-allowed opacity-50'}`}
                                >
                                    Send Reset Email
                                </button>
                            </form>
                        </div>}

                        {isHidden && <p>Message sent!  Please check your email to reset your password.  Please check your spam folder if you do not receive the reset email within a few minutes.</p>}

                    </div>
                </div>
            </div>
        </div>
  )
}

export default ResetPassword;