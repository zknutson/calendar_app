import { db } from '../../firebase-config'; // Adjust the path as necessary
import { collection, getDocs } from 'firebase/firestore';

export const handler = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const events = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return {
            statusCode: 200,
            body: JSON.stringify(events)
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                status: 'Error',
                message: error.message
            })
        };
    }
};