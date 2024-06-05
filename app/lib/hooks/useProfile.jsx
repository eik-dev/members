import useSWR from "swr";
import { fetcher } from "@/app/lib/data";
import { popupE } from "../trigger";
export default function useProfile (id, role) {
    const { data:profile, profileError, profileLoading } = useSWR(['/profile',{id,role}], fetcher, {revalidateIfStale: false})
    const { data:requirements, requirementsError, requirementsLoading } = useSWR(['/files/requirements',{id,role}], fetcher, {revalidateIfStale: false})
    const { data:photo, photoError, photoLoading } = useSWR(['/files/profile',{id,role}], fetcher, {revalidateIfStale: false})

    if (profileError || requirementsError || photoError) popupE('error', 'Error', 'Server Error')

    return {
        data: {
            ...profile, 
            requirements:requirements, 
            photo: photo
        },
        isLoading: profileLoading || requirementsLoading || photoLoading,
        isError: profileError || requirementsError || photoError
    }
}