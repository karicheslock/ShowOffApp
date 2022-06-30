import { db } from '../firebase-config';
import { query, getDocs, where, collection } from 'firebase/firestore';

export async function doesUsernameExist(username) {
    const q = query(collection(db, 'users'), where('username', '==', username));
    const result = await getDocs(q);

    return result.docs.map((user) => user.data().length > 0);
};

export async function doesEmailExist(email) {
    const q = query(collection(db, 'users'), where('emailAddress', '==', email));
    const result = await getDocs(q);

    return result.docs.map((user) => user.data().length > 0);
};