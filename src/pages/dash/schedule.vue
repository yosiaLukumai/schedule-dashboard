<template>
  <div class="q-ma-md row">
    <q-card class="my-card q-pa-md bg-primary col-md-9 col-12" bordered style="border-radius:15px">
      <div class="text-center text-white text-h6 q-pt-md">
        Add Schedule
      </div>
      <div>
        <q-form @submit.prevent="submitSchedule">
          <div class="row flex-center">
            <div class="col-10 q-pt-md ">
              <q-select color="info" v-model="classLevelValue" :options="classLevel" label="Select class" dark :rules="[
                (val) => (val && val.length > 0) || 'class name is required',
              ]">
                <template v-slot:prepend>
                  <q-icon name="class" />
                </template>
              </q-select>
            </div>
            <div class="col-10 q-pt-md">
              <q-select color="info" v-model="roomNameValue" :options="roomName" label="Select room name" dark :rules="[
                (val) => (val && val.length > 0) || 'roomname is required',
              ]">
                <template v-slot:prepend>
                  <q-icon name="las la-calendar-week" />
                </template>
              </q-select>
            </div>
            <div class="col-10 q-pt-md">
              <q-input color="secondary" v-model="subjectNameValue" dark ref="subjectName" label-color="info"
                class="text-bold text-info" hint="Fundamental of Mechanics" label="Subject Name" :rules="[
                  (val) => val.length <= 30 || 'Please use maximum 8 characters',
                  (val) => (val && val.length > 0) || 'Subject name is required',
                ]">
                <template v-slot:prepend>
                  <q-icon name="article" color="info" />
                </template>
              </q-input>
            </div>
            <div class="col-10 q-pt-md ">
              <q-input v-model="codenameValue" color="secondary" dark class="text-bold text-info" ref="codename"
                hint="ME-7645" label="Module codename" label-color="info" :rules="[
                  (val) => val.length <= 7 || 'Please use maximum 8 characters',
                  (val) => (val && val.length > 0) || 'codename is required',
                ]">
                <template v-slot:prepend>
                  <q-icon name="code" color="info" />
                </template>
              </q-input>
            </div>

            <div class="col-10 q-pt-md ">
              <q-input v-model="teacherValue" color="secondary" dark class="text-bold text-info" ref="teacher"
                hint="Mr mbawala" label="Teacher name" label-color="info" :rules="[
                  (val) => val.length <=30 || 'Please use maximum 8 characters',
                  (val) => (val && val.length > 0) || 'codename is required',
                ]">
                <template v-slot:prepend>
                  <q-icon name="person" color="info" />
                </template>
              </q-input>
            </div>


            <div class="col-10 q-pt-md ">
          
              <q-input  v-model="startTimeValue" color="info" hint="15:21" label="Start-time" dark class="text-bold text-info" style="width:300px">
    

      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-time v-model="startTimeValue" mask="YYYY-MM-DD HH:mm" format24h>
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
            </div>
            <div class="col-10 q-pt-md ">
          <q-input  v-model="endTimeValue" color="info" hint="15:21" label="End-time" dark class="text-bold text-info" style="width:300px">
      <!-- <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="endTimeValue" mask="YYYY-MM-DD HH:mm">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template> -->

      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-time v-model="endTimeValue" mask="YYYY-MM-DD HH:mm" format24h>
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
              
            </div>

            <div class="col-10 q-pt-md q-pb-xl">
              <q-select color="info" v-model="dayValue" :options="days" label="Select day" dark>
                <template v-slot:prepend>
                  <q-icon name="las la-calendar-week" />
                </template>
              </q-select>
            </div>
            <q-btn type="submit" rounded no-caps class="col-6 text-body1 text-bold " padding="12px 23px"
              text-color="white" color="secondary" label="Add Schedule"></q-btn>
          </div>

        </q-form>
      </div>
    </q-card>

  </div>
</template>

<script>
import { ref, onMounted } from "vue"
import { date } from 'quasar'
import {useRouter} from "vue-router"
import { roomStore } from "src/stores/room"
import {scheduleStore} from "src/stores/schedule"
import { notify } from "src/utils/notify"
import {newdate} from "src/utils/dates"
export default {
  setup() {
    const timestamp = Date.now()
    const roomStores = roomStore()
    let allRoomsIdss = null
    const ready = ref(false)
    const classLevel = ['NTA-6-first-yr', 'NTA-6-second-yr', 'NTA-6-third-yr', 'UQF8-first-yr', 'UQF8-second-yr', 'UQF8-third-yr']
    const classLevelValue = ref("")
    const roomIdValue = ref("")
    const roomName = ref(null)
    const router = useRouter()
    const sc = scheduleStore()
    const roomNameValue = ref("")
    const dayValue = ref("")
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    const teacher = ref(null)
    const teacherValue = ref("")
    const codename = ref(null)
    const codenameValue = ref("")
    const subjectName = ref(null)
    const startTimeValue = ref("12:25")
    const subjectNameValue = ref("")
    const endTimeValue = ref("10:25")

    onMounted(async () => {
      endTimeValue.value = date.formatDate(timestamp, 'YYYY-MM-DD HH:mm')
      startTimeValue.value = date.formatDate(timestamp, 'YYYY-MM-DD HH:mm')

      // fething the dat

      const allVen = await roomStores.getAllRooms()
      if (allVen.inerror) {
        notify("Failed to connect")
      } else {
        if (allVen.success) {
          roomStores.allRooms = allVen.body
          const namesAndId = roomStores.getRoomNameId
          if (namesAndId) {
            // extracting the values of ids and names 
            allRoomsIdss = namesAndId
            const roomsids = []
            const roomsnames = []
            for (let x = 0; x < namesAndId.length; x++) {
              roomsids.push(namesAndId[x].id)
              roomsnames.push(namesAndId[x].roomName)
            }
            roomName.value = roomsnames
          }

        }

      }
      // gettting all the value of the venues and their ids



    })

    const submitSchedule = async () => {

      // getting the ids 
      for (let x = 0; x < allRoomsIdss.length; x++) {
        if (allRoomsIdss[x].roomName == roomNameValue.value) {
          //
          roomIdValue.value = allRoomsIdss[x].id
          break
        }
      }
    const savedSChedule = await sc.createSchedule(roomIdValue.value, roomNameValue.value, dayValue.value, teacherValue.value, codenameValue.value, subjectNameValue.value, classLevelValue.value, startTimeValue.value,endTimeValue.value)
    console.log(savedSChedule)
    if(savedSChedule.inerror) {
        notify("Failed")
      }else {
        if(savedSChedule.success) {
          console.log("saved schedule")
          notify("Schedule saved")
          router.replace({path: "/auth/dash"})
        }
      }
    }
    return {
      submitSchedule,
      endTimeValue,
      subjectName,
      subjectNameValue,
      codename,
      codenameValue,
      teacherValue,
      teacher,
      days,
      ready,
      dayValue,
      roomName,
      roomNameValue,
      startTimeValue,
      classLevelValue,
      classLevel,
      date: ref('2019-02-01 12:44')
    }
  }
}
</script>

<style>

</style>


