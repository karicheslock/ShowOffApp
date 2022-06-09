import { useState, useEffect } from 'react';
import {auth, provider} from '../firebase-config';
import {signInWithPopup, signOut} from 'firebase/auth';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { addDoc, collection} from 'firebase/firestore';
import { db } from '../firebase-config';
//import { doesUsernameExist } from '../services/firebase';


function SignUp() {

    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

    const signInWithGoogle = () => {
            signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
        });
    };
  
    const navigate = useNavigate();

    const userCollectionRef = collection(db, "users");

    const isInvalid = username === '' || fullname === '' || email === '' || password === '';

    const handleUsernameChange = event => {
        setUsername(event.target.value.toLowerCase().trim());
    }

    const handleFullnameChange = event => {
        setFullname(event.target.value);
    }

    const handleEmailChange = event => {
        setEmail(event.target.value.toLowerCase().trim());
    }

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    }

    const handleSubmit = async event => {
        event.preventDefault();

        //const usernameExists = doesUsernameExist(username);
        //fix this!
        const usernameExists = false;

        if(!(await usernameExists).length) {
            try {
                const createdUserResult = await createUserWithEmailAndPassword(auth, email, password);

                await updateProfile(auth.currentUser, {
                    displayName: username
                });

                await addDoc(userCollectionRef, {userId: createdUserResult.user.uid, username: username.toLowerCase(), fullName: fullname, emailAddress: email, following: [], followers: [], dateCreated: Date.now()});

                navigate('/');
            } catch(error) {
                setUsername('');
                setFullname('');
                setEmail('');
                setPassword('');
                setError(error.message);
            }
        } else {
            setUsername('');
            setFullname('');
            setEmail('');
            setPassword('');
            setError('That username is already taken, please try a different one');
        }
    }

    useEffect(() => {
        document.title = 'Signup - ShowOff';
    }, [] );

    return (
        <div className='container flex mx-auto max-w-xs items-center h-screen'>
            <div className='flex flex-col'>
                <div className='flex flex-col items-center bg-white p-4 border mb-4'>
                    <h1 className='flex justify-center w-full'>
                        <img src='./show-off-logo.png' alt='ShowOff logo' className='mt-2 w-6/12 mb-4' />
                    </h1>

                    {error && <p className='mb-4 text-xs text-red-500 text-center'>{error}</p>}

                    <form onSubmit={handleSubmit} method='POST'>
                        <input 
                            aria-label='Enter your username'
                            className='text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2'
                            type='text'
                            name='username'
                            placeholder='Username'
                            onChange={handleUsernameChange}
                            value={username}
                        />
                        <input 
                            aria-label='Enter your full name'
                            className='text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2'
                            type='text'
                            name='fullname'
                            placeholder='Full Name'
                            onChange={handleFullnameChange}
                            value={fullname}
                        />
                        <input 
                            aria-label='Enter your email address'
                            className='text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2'
                            type='email'
                            name='email'
                            placeholder='Email Address'
                            onChange={handleEmailChange}
                            value={email}
                        />
                        <input 
                            aria-label='Enter your password'
                            className='text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2'
                            type='password'
                            name='password'
                            placeholder='Password'
                            onChange={handlePasswordChange}
                            value={password}
                        />
                        <button
                            type='submit'
                            className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${isInvalid && 'cursor-not-allowed opacity-50'}`}
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
                <div className='flex justify-center items-center flex-col w-full bg-white p-4 border'>
                    <p className='text-sm'>Already have an account? <Link to='/login' className='font-bold'>Log in</Link></p>
                </div>
            </div>
        </div>
    )
};

export default SignUp;