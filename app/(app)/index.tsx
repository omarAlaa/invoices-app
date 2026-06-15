import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

export default function Index() {
    const { userId, setInfo } = useAuthStore()
    useEffect(() => {
        if (userId) getProfile()
    }, [userId])

    const getProfile = async () => {
        try {
            //setLoading(true)

            let { data, error, status } = await supabase
                .from('profiles')
                .select(`first_name, last_name, avatar_url`)
                .eq('id', userId)
                .single()
            if (error && status !== 406) {
                throw error
            }
            if (data) {
                setInfo(data.first_name, data.last_name, data.avatar_url)
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        } finally {
            //setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to the Protected App area!</Text>
            <Button
                title="Sign Out"
                onPress={() => supabase.auth.signOut()}
                color="red"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    text: { fontSize: 18, marginBottom: 20 }
});