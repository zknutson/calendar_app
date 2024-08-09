// addEvent.js
import { db } from '../firebase-config';
import { collection, addDoc } from 'firebase/firestore';

export const addEvent = async (eventDetails) => {
    try {
        const docRef = await addDoc(collection(db, 'events'), {
            name: eventDetails.name,
            date: eventDetails.date,
            time: eventDetails.time,
            idea: eventDetails.idea
        });
        return {
            status: 'Event added',
            event: { id: docRef.id, ...eventDetails }
        };
    } catch (error) {
        return {
            status: 'Error',
            message: error.message
        };
    }
};

// Usage example in your client-side application
const newEvent = {
    name: "Event Name",
    date: "2023-11-18",
    time: "15:00",
    idea: "Event Idea"
};

addEvent(newEvent)
    .then(result => console.log(result))
    .catch(error => console.error("Error adding event:", error));