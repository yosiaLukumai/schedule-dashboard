<template>
  <div class="row q-ma-lg ">
    <q-card class="col-md-8 my-card q-pa-md" bordered style="border-radius:15px">
      <div>
        <span class="q-pl-md text-secondary text-h5 text-bold">Add a room</span>
      </div>
      <div>
        <q-form @submit.prevent="addRoom" class="q-pt-md">
          <div class="row flex-center">
            <div class="col-10 q-pt-md">
              <q-input color="secondary" label-color="info"  v-model="roomNameValue" ref="roomName" class="text-bold" label="RoomName"
                hint="phase2" :rules="[
                  (val) => val.length <= 12 || 'Please use maximum 8 characters',
                  (val) => (val && val.length > 0) || 'Roomname is required',
                ]">
                <template v-slot:prepend>
                  <q-icon name="las la-city" color="info" />
                </template>
              </q-input>
            </div>
            <div class="col-10 q-pt-md">
              <q-input v-model="levelValue" ref="level" label-color="info" class="text-bold text-info" hint="3 storrey"
                label="RoomLevel" type="number" :rules="[
                  (val) => (val > 0) || 'Roocapacity can not be negative',
                ]">
                <template v-slot:prepend>
                  <q-icon name="las la-building" color="info" />
                </template>
              </q-input>
            </div>
            <div class="col-10 q-pt-md q-pb-xl">
              <q-input v-model="roomCapacityValue" class="text-bold text-info" type="number" ref="roomCapacity"
                hint="40-people" label="RoomCapacity" label-color="info" :rules="[
                  (val) => (val > 0) || 'Roocapacity can not be negative',
                ]">
                <template v-slot:prepend>
                  <q-icon name="las la-meh" color="info" />
                </template>
              </q-input>
            </div>
            <q-btn type="submit" rounded no-caps class="col-6 text-body1 text-bold" padding="12px 23px" text-color="white" color="primary" label="Add Room"></q-btn>
            <div class="q-mb-xl"></div>
          </div>

          
        </q-form>
      </div>
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue"
import {useRouter} from "vue-router"
import {roomStore} from "src/stores/room"

import {notify} from "src/utils/notify"
export default {
  setup() {
    const router = useRouter()
    const roomStores = roomStore()
    const roomName = ref(null)
    const roomNameValue = ref("")
    const level = ref(null)
    const levelValue = ref(0)
    const roomCapacity = ref(null)
    const roomCapacityValue = ref(0)
    const addRoom = async () => {
      const saved = await roomStores.registerAroom(levelValue.value, roomCapacityValue.value, roomNameValue.value)
      console.log(saved)
      if(saved.inerror) {
        notify("failed to connect")
      }else {
        if(saved.success) {
          notify("room saved")
          router.replace({path: "/auth/dash/schedule"})
          // updating the database 
          if (roomStores.allRooms) {
            // push the data to the array
            roomStores.allRooms.push(saved.body)
            
          }else {
            const allRooms = await roomStores.getAllRooms()
            if(allRooms.inerror) {
              notify("failed to connect")
            }else {
              if(allRooms.success) {
                // setting the data to the store
                roomStores.allRooms = allRooms.body
              }
            }
          }
        }
      }
    }
    return {
      addRoom, roomName, roomNameValue, roomCapacity, roomCapacityValue, level, levelValue
    }
  }
}
</script>

<style>

</style>