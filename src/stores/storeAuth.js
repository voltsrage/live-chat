import { defineStore } from 'pinia'
import { db, timestamp, auth } from '@/firebase/config'
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { collection, setDoc, doc, onSnapshot, deleteDoc, updateDoc, getDocs, getDoc } from 'firebase/firestore';
import { useStoreMessages } from '@/stores/storeMessage'

export const useStoreAuth = defineStore('storeAuth', {

    state: () => {
        return {
            user: {},
            error: null
        }
    },
    actions: {
        init() {
            const storeMessage = useStoreMessages();
            onAuthStateChanged(auth, async(user) => {
                if (user) {
                    this.user.id = user.uid
                    this.user.email = user.email
                    let usersFromFirebase = collection(db, "users");
                    let currentDetailsRef = doc(usersFromFirebase, user.uid)
                    let currentDetails = await getDoc(currentDetailsRef)

                    if (currentDetails.exists()) {
                        this.user.displayName = currentDetails.data().displayName
                    } else {
                        this.user.displayName = ''
                    }

                } else {
                    this.user = {}
                    this.router.replace('/')
                    storeMessage.clearMessages()
                }
            })
        },
        registerUser(credentials) {
            this.error = null;
            createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
                .then(async(userCredential) => {

                    const user = userCredential.user;

                    await setDoc(doc(db, "users", userCredential.user.uid), {
                        displayName: credentials.displayName
                    })
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    this.error = errorMessage
                });
        },
        loginUser(credentials) {
            this.error = null;
            signInWithEmailAndPassword(auth, credentials.email, credentials.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    this.error = errorMessage
                });
        },
        logoutUser() {
            signOut(auth).then(() => {
                console.log('logout')
            }).catch((error) => {

            })
        }
    },
    getters: {

    }
})