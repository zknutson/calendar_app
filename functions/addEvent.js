import { db } from '../../firebase-config'; // Adjust the path as necessary
import { collection, addDoc } from 'firebase/firestore';

export const handler = async (event, context) => {
    const body = JSON.parse(event.body);

    try {
        const docRef = await addDoc(collection(db, 'events'), {
            name: body.name,
            date: body.date,
            time: body.time,
            idea: body.idea
        });
        return {
            statusCode: 201,
            body: JSON.stringify({
                status: 'Event added',
                event: { id: docRef.id, ...body }
            })
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