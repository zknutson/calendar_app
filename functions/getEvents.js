// getEvents.js
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';

export const getEvents = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const events = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return {
            status: 'Success',
            events: events
        };
    } catch (error) {
        return {
            status: 'Error',
            message: error.message
        };
    }
};