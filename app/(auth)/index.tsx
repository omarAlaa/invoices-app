import SignButton from "@/components/authScreen/SignButton";
import ActionButton from "@/components/shared/ActionButton";
import InputField from "@/components/shared/InputField";
import PasswordField from "@/components/shared/PasswordField";
import { Image } from "expo-image";
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';

export default function AuthScreen() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const bttnDisabled = loading || !email || !password

    async function signInWithEmail() {
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) Alert.alert('Sign In Error', error.message);

        setLoading(false);
    }

    async function signUpWithEmail() {
        setLoading(true);

        const { error, data: { session } } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            Alert.alert('Sign Up Error', error.message);
        } else if (!session) {
            Alert.alert('Success!', 'Please check your inbox for email verification.');
        }

        setLoading(false);
    }

    return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" bottomOffset={40}>
            <SafeAreaView className='flex-1 gap-10 px-6 pt-10'>
                <View className="flex-1 justify-center items-center">
                    <Image source={require('@/assets/images/appLogo.png')} style={styles.image} />
                </View>

                <Text className='text-center font-bold text-4xl text-sky-800'>{isLogin ? 'Welcome back' : 'Create account'}</Text>

                <View className='flex-row p-1 rounded-full bg-gray-200'>
                    <SignButton label="Sign In" pressed={isLogin} onPress={() => setIsLogin(true)} />

                    <SignButton label="Sign Up" pressed={!isLogin} onPress={() => setIsLogin(false)} />
                </View>

                <View className='gap-4'>
                    <InputField isEmail={true} setValue={setEmail} />

                    <PasswordField password={password} setPassword={setPassword} placeholder={true} />
                </View>

                <ActionButton
                    label={isLogin ? 'Sign In' : 'Sign Up'}
                    loading={loading}
                    bttnDisabled={bttnDisabled}
                    onPress={isLogin ? signInWithEmail : signUpWithEmail} />
            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 70,
        height: 70,
        borderRadius: 18,
    },
});