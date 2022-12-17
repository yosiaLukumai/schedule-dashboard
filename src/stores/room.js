import {defineStore} from "pinia"
import { api } from "src/boot/axios";

export const roomStore = defineStore("rooms", {
    state: () => ({
        allRooms: null
    }),
    getters: {
        getRoomNameId: (state) => {
            const emptyArray = []
            if (state.allRooms) {
                for(let x = 0; x < state.allRooms.length; x++) {
                    emptyArray.push({id: state.allRooms[x]._id, roomName: state.allRooms[x].roomName})
                }
                return emptyArray
            }
        },
       
    },
    actions: {
       async getAllRooms () {
        try {
            const allRooms = await api.get("/api/allRooms")
            return allRooms.data
        } catch (error) {
            return { inerror: true, message: "failed to connect" };
        }
        },
        async registerAroom (level, roomCapacity, roomName) {
            try {
                const saved = await api.post("/api/createroom", {level, roomCapacity, roomName})
                return saved.data
            } catch (error) {
                return { inerror: true, message: "failed to connect" };
            }
        }
    },
    persist: true

})