import { Image } from "expo-image";
import { Eye, EyeOff, Lock, Mail } from 'lucide-react-native';
import { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView, KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';

export default function AuthScreen() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const bttnDisabled = loading || !email || !password
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);
    const [focusedField, setFocusedField] = useState('');

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
        <KeyboardProvider>
            <KeyboardAwareScrollView scrollEnabled={false}>
                <SafeAreaView className='flex-1 gap-10 px-6 pt-10'>
                    <View className="flex-1 justify-center items-center">
                        <Image source={require('@/assets/images/capture.png')} style={styles.image} />
                    </View>

                    <Text className='text-center font-bold text-4xl text-sky-800'>{isLogin ? 'Welcome back' : 'Create account'}</Text>

                    <View className='flex-row p-1 rounded-full bg-gray-200'>
                        <TouchableOpacity className={`flex-1 items-center justify-center rounded-full py-3 ${isLogin ? 'bg-white border-[3px] border-blue-600' : ''}`} onPress={() => setIsLogin(true)}>
                            <Text className='font-bold'>Sign In</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className={`flex-1 items-center justify-center rounded-full py-3 ${!isLogin ? 'bg-white border-[3px] border-blue-600' : ''}`} onPress={() => setIsLogin(false)}>
                            <Text className='font-bold'>Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                    <View className='gap-4'>
                        <View className={`flex-row items-center gap-4 border-2 bg-gray-200 rounded-xl px-4 ${focusedField === 'email' ? 'border-blue-600' : 'border-gray-300'}`}>
                            <Mail color={focusedField === 'email' ? 'black' : 'gray'} />
                            <TextInput className='flex-1 py-4' placeholder="Email Address" autoCorrect={false} placeholderTextColor="#64748B" keyboardType="email-address" autoCapitalize="none" onChangeText={setEmail} onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField('')} />
                        </View>

                        <View className={`flex-row items-center gap-4 border-2 bg-gray-200 rounded-xl px-4 ${focusedField === 'password' ? 'border-blue-600' : 'border-gray-300'}`}>
                            <Lock color={focusedField === 'password' ? 'black' : 'gray'} />
                            <TextInput className='flex-1 py-4' placeholder="Password" placeholderTextColor="#64748B" secureTextEntry={isPasswordSecure} onChangeText={setPassword} onFocus={() => setFocusedField('password')} onBlur={() => setFocusedField('')} />
                            {isPasswordSecure ? <EyeOff color={focusedField === 'password' ? 'black' : 'gray'} onPress={() => setIsPasswordSecure(false)} /> : <Eye color={focusedField === 'password' ? 'black' : 'gray'} onPress={() => setIsPasswordSecure(true)} />}
                        </View>
                    </View>

                    <TouchableOpacity className={`flex-row gap-2 justify-center items-center bg-sky-800 rounded-full p-4 ${bttnDisabled && !loading ? 'opacity-40' : ''}`} onPress={isLogin ? signInWithEmail : signUpWithEmail} disabled={bttnDisabled}>
                        <Text className='color-white font-bold text-xl'>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
                        {loading && <ActivityIndicator color={'white'} />}
                    </TouchableOpacity>
                </SafeAreaView>
            </KeyboardAwareScrollView>
        </KeyboardProvider>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 70,
        height: 70,
        borderRadius: 18,
    },
});