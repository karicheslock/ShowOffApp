import {useEffect, useState} from 'react';
import {getAuth, sendPasswordResetEmail} from 'firebase/auth';

function ResetPassword() {

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isHidden, setIsHidden] = useState(false);

    const isInvalid = email === '';

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const auth = getAuth();
        const user = auth.currentUser;
        console.log(user)

        if (user) {
            console.log(user.emailAddress)
        }

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

                        {isHidden && <p>Message sent!  Please check your email to reset your password.</p>}

                    </div>
                </div>
            </div>
        </div>
  )
}

export default ResetPassword;