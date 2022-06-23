import { useState, useEffect } from 'react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db, auth, storage } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL, listAll, list} from 'firebase/storage';

function CreateCollection() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState(null);
    const [imageArray, setImageArray] = useState([]);
    const [progress, setProgress] = useState(0);

    let navigate = useNavigate();

    const isAuth = localStorage.getItem('isAuth');

    const createUserCollection = async (event) => {
        event.preventDefault();

        const userCollectionsRef = collection(db, 'userCollections');

        try {
            await addDoc(userCollectionsRef, {
                title,
                description,
                author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
                imageArray,
                created: Timestamp.now()
            });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };
    
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handleImageChange = async (event) => {
        event.preventDefault();
        const file = event.target[0].files[0];
        uploadFiles(file);
        const imageName = event.target[0].files[0].name;
        await getDownloadURL(ref(storage, `gs://showoff-app-2f072.appspot.com/${imageName}`))
            .then((url) => {
                setImageArray(imageArray => [
                    ...imageArray,
                    url
                ])
            })
        console.log(imageArray)
    };

    const uploadFiles = (file) => {
        if (!file) return;

        const storageRef = ref(storage, `${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(prog);
        },
        (err) => console.log(err),
        () => {
             getDownloadURL(uploadTask.snapshot.ref)
                .then(url => setImageURL(url))
        }
        );
    };

    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        }
    }, [isAuth, navigate])

    useEffect(() => {
        document.title = 'Create a Collection';
    }, [])

  return (
    <div className='container flex flex-col items-center h-screen bg-amber-50'>
        <div className='flex flex-col justify-center h-full'>
            <label>Select a title for your collection:</label>
            <input aria-label='Enter a title' placeholder='Title...' onChange={handleTitleChange} />
            <label>Enter a description of your collection:</label>
            <textarea aria-label='Enter a description' placeholder="Description..." onChange={handleDescriptionChange} />
            <div className='flex flex-col items-center justify-center'>
                <form method="POST" onSubmit={handleImageChange}>
                    <label>Add an image?</label>
                    <div className='flex'>
                        <input type="file" id='input-btn' className='input' aria-label='Select file' />
                        <button type='submit'>Upload</button>
                    </div>
                </form>
                <h3>Uploaded {progress} %</h3>
            </div>
            <button onClick={createUserCollection}>Create Collection</button>
            <button onClick={() => navigate('/')}>Cancel</button>
        </div>
    </div>
  )
}

export default CreateCollection;