import {defineStore} from "pinia"
import { api } from "src/boot/axios";

export const scheduleStore = defineStore("schedule", {
    state: () => ({
        allRooms: null
    }),
    actions: {
       async getAllSchedules () {
        try {
            const allRooms = await api.get("/api/all")
            return allRooms.data
        } catch (error) {
            return { inerror: true, message: "failed to connect" };
        }
        },
        async createSchedule (roomId, roomName, day, teacher, codename, subjectName, classLevel, startTime, endTime) {
            try {
                const saved = await api.post("/api/room/schedule", {roomId, roomName, day, teacher, codename, subjectName, classLevel, startTime, endTime})
                return saved.data
            } catch (error) {
                return { inerror: true, message: "failed to connect" };
            }
        }
    },
    persist: true

})