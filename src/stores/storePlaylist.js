import { defineStore } from 'pinia'
import { collection, addDoc, doc, onSnapshot, deleteDoc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '@/firebase/config'

let playlistsCollectionRef;
let getPlaylistsSnapshot = null;

export const useStorePlaylists = defineStore('storePlaylists', {
    state: () => {
        return {
            playlists: [],
            playlistsLoaded: false
        }
    },
    actions: {
        init() {
            // auth
            const storeAuth = useStoreAuth();
            playlistsCollectionRef = collection(db, "users", storeAuth.user.id, "playlists");
            this.getPlaylists()
        },
        async getPlaylists() {
            // live updates
            this.playlistsLoaded = false

            const q = query(playlistsCollectionRef, orderBy('date', 'asc'))
            getPlaylistsSnapshot = onSnapshot(q, (querySnapshot) => {
                let playlists = []
                querySnapshot.forEach((doc) => {
                    let playlist = {
                        id: doc.id,
                        title: doc.data().title,
                        description: doc.data().description,
                        userId: doc.data().userId,
                        userName: doc.data().userName,
                        coverUrl: doc.data().coverUrl,
                        filePath: doc.data().filePath,
                    }
                    playlists.push(playlist)
                });
                this.playlists = playlists
            }, error => {
                console.log('error.message', error.message)
            });
            this.playlistsLoaded = true
        },
        clearPlaylists() {
            this.playlists = []
            if (getPlaylistsSnapshot) getPlaylistsSnapshot(); // unsubscribe from any active listener
        },
        async addPlaylist(newPlaylist) {

            await addDoc(playlistsCollectionRef, newPlaylist)
                //this.playlists.unshift(playlist)

        },
        async deletePlaylist(playlistId) {
            //this.playlists = this.playlists.filter(playlist => { return playlist.id !== playlistId })
            await deleteDoc(doc(playlistsCollectionRef, playlistId));
        },
        async updatePlaylist(playlistId, content) {
            //let index = this.playlists.findIndex(playlist => playlist.id === playlistId)
            //this.playlists[index].content = content

            await updateDoc(doc(playlistsCollectionRef, playlistId), {
                content: content
            })
        }
    },
    getters: {
        getPlaylistContent: (state) => {

            return (playlistId) => {
                return state.playlists.filter(playlist => {
                    return playlist.id === playlistId
                })[0].content
            }
        },
        totalPlaylistsCount: (state) => {
            return state.playlists.length
        },
        totalCharactersCount: (state) => {
            let count = 0;
            state.playlists.forEach(playlist => {
                count += playlist.content.length
            })

            return count;
        }
    }
})