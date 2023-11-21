import { useFetch } from "@/_helpers/client/useFetch"
import { useRouter } from "next/navigation"
import { create } from "zustand"


const initialState = {
    users: undefined,
    user: undefined,
    currentUser: undefined
}
const userStore = create<IUserStore>(()=>initialState)

export function useUserService(): IUserService{
    const fetch = useFetch()
    const router = useRouter()
    const {users, user, currentUser} = userStore()

    return {
        currentUser,
        login: async (username, password)=>{
            try{
                const currentUser = await fetch.post('/api/account/login', {username, password})
                userStore.setState({...initialState, currentUser})
                router.push('/')
            }
            catch(error :any){
                console.log('error:', error)
            }
        },
        register: async (user)=>{
            try{
                await fetch.post('/api/account/register', user)
                router.push('/login')
            }
            catch(err: any){
                console.log(err)
            }
        },
        getCurrent: async ()=>{
            if (!currentUser){
                userStore.setState({currentUser: await fetch.get('api/users/current')})
            }
        }
    }
}


//interfaces
interface IUser {
    id: string,
    username: string,
    password: string,
    isDeleting?: boolean
}

interface IUserStore {
    users?: IUser[],
    user?: IUser,
    currentUser?: IUser
}

interface IUserService extends IUserStore {
    login: (username: string, password: string) => Promise<void>,
    // logout: () => Promise<void>,
    register: (user: IUser) => Promise<void>,
    // getAll: () => Promise<void>,
    // getById: (id: string) => Promise<void>,
    getCurrent: () => Promise<void>,
    // create: (user: IUser) => Promise<void>,
    // update: (id: string, params: Partial<IUser>) => Promise<void>,
    // delete: (id: string) => Promise<void>
}