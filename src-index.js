import {db} from './firebase-config';
import {addDoc, collection, onSnapshot} from 'firebase/firestore';

let lastFetchedSnapshot = null;

async function addEvent() {
    console.log('addEvent');
    try {
        const docRef = await addDoc(collection(db, 'events'), {
            name: document.getElementById('event-name').value,
            date: document.getElementById('event-date').value,
            time: document.getElementById('event-time').value,
            idea: document.getElementById('event-idea').checked,
            submitTime: new Date().getTime()
        });
        console.log(docRef);
    } catch (error) {
        console.error(error);
    }
}

function fetchEvents() {
    console.log('fetchEvents');
    const eventCollectionRef = collection(db, 'events');
    let events = [];
    // Store the unsubscribe function if needed to stop listening later
    lastFetchedSnapshot = onSnapshot(eventCollectionRef, (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
            if (change.type === 'added' || change.type === 'modified' || change.type === 'removed') {
                const event = {id: change.doc.id, ...change.doc.data()};
                if (change.type !== 'removed') {
                    events.push(event);
                }
                if (change.type === 'removed') {
                    events = events.filter(event => event.id !== change.doc.id);
                }
                console.log(`Event ${change.type}:`, event);
            }
        });

        const eventList = document.getElementById('event-list');
        eventList.innerHTML = '';

        events.forEach(event => {
            const listItem = document.createElement('li');
            listItem.textContent = `${event.name} - ${event.date} ${event.time} ${event.idea ? '(Idea)' : ''}`;
            eventList.appendChild(listItem);
        });
    });
}

document.addEventListener('DOMContentLoaded', fetchEvents);

// Expose addEvent function to the global scope
window.addEvent = addEvent;