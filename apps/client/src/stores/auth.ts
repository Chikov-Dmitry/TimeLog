import {defineStore} from "pinia";
import {ref} from "vue";
import {enumStatusLoad} from "@/common/enumStatusLoad";
import {IAuthUserResponseDto} from "@timelog/interfaces";
import AuthApi from "@/api/auth.api";
import axios, {AxiosError} from "axios";

export const useAuthStore = defineStore('auth',()=>{
    const isAuthenticated = ref(false)
    const user = ref<IAuthUserResponseDto | null>(null)
    const statusLoad = ref(enumStatusLoad.NOT_STARTED)
    const deviceId = ref<string>("")

    async function login(email: string, password: string, deviceId: string){
        try{
            const response = await AuthApi.login({email, password, deviceId})
            isAuthenticated.value =true
            console.log({...response.data})
        }catch (e) {
            if(axios.isAxiosError(e)){
                console.log(e)
            }else{
                console.error(e)
            }

        }
    }

    return{isAuthenticated, user, statusLoad, deviceId, login}
})