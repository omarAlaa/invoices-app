import AddButtons from '@/components/homeScreen/AddButtons';
import GreetingsSection from '@/components/homeScreen/GreetingsSection';
import Outstanding from '@/components/homeScreen/Outstanding';
import RecentInvoices from '@/components/homeScreen/RecentInvoices';
import { getProfile } from '@/lib/actions';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const { userId } = useAuthStore()

    useEffect(() => {
        if (userId) getProfile(userId)
    }, [userId])

    return (
        <SafeAreaView className='p-8 gap-8'>
            <GreetingsSection />

            <Outstanding />

            <AddButtons />

            <RecentInvoices />
        </SafeAreaView>
    );
}