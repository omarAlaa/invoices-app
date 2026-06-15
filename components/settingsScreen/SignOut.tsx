import { supabase } from '@/lib/supabase';
import { LogOut } from "lucide-react-native";
import { Alert, Text, TouchableOpacity } from "react-native";

export default function SignOut() {
    const handleLogOut = () => {
        Alert.alert('Log out', 'Do you want to log out ?', [
            { text: 'Cancel' },
            {
                text: 'Log out',
                onPress: () => supabase.auth.signOut(),
                style: 'destructive',
            },
        ])
    }

    return (
        <TouchableOpacity className="flex-row gap-2 pl-2 py-3" onPress={handleLogOut}>
            <LogOut color={'red'} />
            <Text className="font-bold text-lg text-[rgb(255,0,0)]">Log out</Text>
        </TouchableOpacity>
    )
}