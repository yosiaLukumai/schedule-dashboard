import { useRouter } from "vue-router"
const router = useRouter()

export const redirect = (to="#") => {
    router.push(to)
}