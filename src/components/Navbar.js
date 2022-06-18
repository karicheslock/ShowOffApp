import {signOut} from 'firebase/auth';
import {auth} from '../firebase-config';
import {useNavigate, Link} from 'react-router-dom';

function Navbar({setIsAuth}) {

  let navigate = useNavigate();
  let isAuth = localStorage.getItem('isAuth');

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      isAuth = false;
      navigate('/login');
    });
  };

  return (
    <div className="flex items-center w-screen h-24 bg-amber-100 justify-between px-10">
      <Link to='/'><span className='font-blaka-hollow text-4xl text-amber-400 tracking-wide'><span className='text-6xl'>S</span>how<span className='text-6xl'>O</span>ff</span></Link>
      {isAuth && <Link to='/create-collection' target="_blank" rel="noreferrer" className='border-2 rounded border-amber-400 px-4 py-2 bg-amber-400 text-amber-50 font-bold hover:bg-amber-900'>+ Add Collection</Link>}
        {isAuth && <button onClick={signUserOut}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='fill-amber-400 w-6'>
            <path d="M160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64c17.67 0 32-14.33 32-32S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256c0 53.02 42.98 96 96 96h64c17.67 0 32-14.33 32-32S177.7 416 160 416zM502.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L402.8 224H192C174.3 224 160 238.3 160 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C515.1 266.1 515.1 245.9 502.6 233.4z"/>
          </svg>
        </button>}  
    </div>
  )
}

export default Navbar;