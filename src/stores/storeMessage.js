import { defineStore } from 'pinia'
import { collection, addDoc, doc, onSnapshot, deleteDoc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '@/firebase/config'

let messagesCollectionRef = collection(db, "messages");
let getMessagesSnapshot = null;

export const useStoreMessages = defineStore('storeMessages', {
    state: () => {
        return {
            messages: [],
            error: null,
            messagesLoaded: false
        }
    },
    actions: {
        async getMessages() {
            // live updates
            this.notesLoaded = false

            const q = query(messagesCollectionRef, orderBy('createAt', 'asc'))
            getMessagesSnapshot = onSnapshot(q, (querySnapshot) => {
                let messages = []
                querySnapshot.forEach((doc) => {
                    let message = {
                        id: doc.id,
                        name: doc.data().name,
                        message: doc.data().message,
                        createAt: doc.data().createAt,
                    }
                    messages.push(message)
                });
                this.messages = messages
            }, error => {
                console.log('error.message', error.message)
                error = error.message
            });
            this.messagesLoaded = true
        },
        async addMessage(newMessage) {

            await addDoc(messagesCollectionRef, newMessage)
                //this.notes.unshift(note)

        },
        async deleteNote(messageId) {
            //this.notes = this.notes.filter(note => { return note.id !== noteId })
            await deleteDoc(doc(messagesCollectionRef, messageId));
        },
        clearMessages() {
            this.messages = []
            if (getMessagesSnapshot) getMessagesSnapshot(); // unsubscribe from any active listener
        },
        async updateNote(messageId, message) {
            //let index = this.notes.findIndex(note => note.id === noteId)
            //this.notes[index].content = content

            await updateDoc(doc(messagesCollectionRef, messageId), {
                message: message
            })
        }
    }
})