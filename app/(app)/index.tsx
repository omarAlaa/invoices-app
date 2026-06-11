import { Button, StyleSheet, Text, View } from 'react-native';
import { supabase } from '../../lib/supabase';

export default function HomeScreen() {
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