import AddButtons from '@/components/homeScreen/AddButtons';
import GreetingsSection from '@/components/homeScreen/GreetingsSection';
import Outstanding from '@/components/homeScreen/Outstanding';
import RecentInvoices from '@/components/homeScreen/RecentInvoices';
import { getProfile } from '@/lib/actions';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const { userId } = useAuthStore()

    useEffect(() => {
        if (userId) getProfile(userId)
    }, [userId])

    return (
        <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
            <SafeAreaView className='flex-1 px-8 py-10 gap-8'>

                <GreetingsSection />

                <Outstanding />

                <AddButtons />

                <RecentInvoices />

            </SafeAreaView>
        </ScrollView>
    )
}