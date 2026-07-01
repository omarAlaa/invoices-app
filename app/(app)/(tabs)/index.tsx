import AddButtons from '@/components/homeScreen/AddButtons';
import GreetingsSection from '@/components/homeScreen/GreetingsSection';
import Outstanding from '@/components/homeScreen/Outstanding';
import RecentInvoices from '@/components/homeScreen/RecentInvoices';
import { getProfile } from '@/lib/actions';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const { userId } = useAuthStore()
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        if (userId) getProfile(userId)
    }, [userId])

    const onRefresh = () => {
        setRefreshing(true)

        setTimeout(() => {
            setRefreshing(false)
        }, 2000)
    }

    return (
        <SafeAreaView
            className='flex-1 mb-[-4rem]'
        >
            <ScrollView
                className=''
                contentContainerClassName='px-8 pt-6 gap-8'
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >

                <GreetingsSection />

                <Outstanding />

                <AddButtons />

                <RecentInvoices />

            </ScrollView>
        </SafeAreaView>
    )
}