import { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import { doc, setDoc } from 'firebase/firestore';

function VoteButtons({ userCollection }) {

    const [votedCollections, setVotedCollections] = useState([]);
    const [isVoting, setIsVoting] = useState(false);

    useEffect(() => {
        const votesFromLocalStorage = localStorage.getItem('votes');
        let previousVotes = [];

        try {
            if (votesFromLocalStorage === null) {
                previousVotes = [];
            } else {
                previousVotes = JSON.parse(votesFromLocalStorage);
            }
        } catch (error) {
            console.error(error);
        }

        setVotedCollections(previousVotes);
    }, []);

    const handleDisablingOfVoting = (collectionId) => {
        const previousVotes = votedCollections;
        previousVotes.push(collectionId);

        setVotedCollections(previousVotes);

        localStorage.setItem('votes', JSON.stringify(votedCollections));
    };

    const handleClick = async (type) => {
        let upVotesCount = userCollection.upVotesCount;
        let downVotesCount = userCollection.downVotesCount;

        const date = new Date();

        if (type === 'upvote') {
            upVotesCount += 1;
        } else {
            downVotesCount += 1;
        }

        const userCollectionRef = doc(db, 'userCollections', userCollection.id);
        await setDoc(userCollectionRef, {
            title: userCollection.title,
            description: userCollection.description,
            author: { name: userCollection.author.name, id: userCollection.author.id },
            imageArray: userCollection.imageArray,
            upVotesCount,
            downVotesCount,
            created: userCollection.created,
            updated: date.toUTCString(),
        });

        handleDisablingOfVoting(userCollection.id);

        if(!isVoting) {
            setIsVoting(true);
        }
    };

    const checkIfCollectionIsAlreadyVoted = () => {
        if (votedCollections.indexOf(userCollection.id) > -1) {
            return true;
        } else {
            return false;
        }
    }

  return (
    <div>
        <div className='flex'>
            <button onClick={() => handleClick('upvote')} disabled={checkIfCollectionIsAlreadyVoted()} className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='fill-amber-400 w-6'>
                    <path d="M128 447.1V223.1c0-17.67-14.33-31.1-32-31.1H32c-17.67 0-32 14.33-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64C113.7 479.1 128 465.6 128 447.1zM512 224.1c0-26.5-21.48-47.98-48-47.98h-146.5c22.77-37.91 34.52-80.88 34.52-96.02C352 56.52 333.5 32 302.5 32c-63.13 0-26.36 76.15-108.2 141.6L178 186.6C166.2 196.1 160.2 210 160.1 224c-.0234 .0234 0 0 0 0L160 384c0 15.1 7.113 29.33 19.2 38.39l34.14 25.59C241 468.8 274.7 480 309.3 480H368c26.52 0 48-21.47 48-47.98c0-3.635-.4805-7.143-1.246-10.55C434 415.2 448 397.4 448 376c0-9.148-2.697-17.61-7.139-24.88C463.1 347 480 327.5 480 304.1c0-12.5-4.893-23.78-12.72-32.32C492.2 270.1 512 249.5 512 224.1z"/>
                </svg>
            </button>
            <p>{userCollection.upVotesCount}</p>
        </div>
        <div className='flex'>
            <button onClick={() => handleClick('downvote')} disabled={checkIfCollectionIsAlreadyVoted()} className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='fill-amber-400 w-6'>
                    <path d="M96 32.04H32c-17.67 0-32 14.32-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64c17.67 0 32-14.33 32-31.1V64.03C128 46.36 113.7 32.04 96 32.04zM467.3 240.2C475.1 231.7 480 220.4 480 207.9c0-23.47-16.87-42.92-39.14-47.09C445.3 153.6 448 145.1 448 135.1c0-21.32-14-39.18-33.25-45.43C415.5 87.12 416 83.61 416 79.98C416 53.47 394.5 32 368 32h-58.69c-34.61 0-68.28 11.22-95.97 31.98L179.2 89.57C167.1 98.63 160 112.9 160 127.1l.1074 160c0 0-.0234-.0234 0 0c.0703 13.99 6.123 27.94 17.91 37.36l16.3 13.03C276.2 403.9 239.4 480 302.5 480c30.96 0 49.47-24.52 49.47-48.11c0-15.15-11.76-58.12-34.52-96.02H464c26.52 0 48-21.47 48-47.98C512 262.5 492.2 241.9 467.3 240.2z"/>
                </svg>
            </button>
            <p>{userCollection.downVotesCount}</p>
        </div>
    </div>
  )
}

export default VoteButtons;