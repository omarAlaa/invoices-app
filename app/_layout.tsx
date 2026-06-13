import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/useAuthStore';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import "../global.css";

export default function RootLayout() {
  const { userId, isInitialized, setAuth, clearAuthInfo, setIsInitialized } = useAuthStore();

  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setAuth(session.user.id, session.user.email ?? null);
      }
      setIsInitialized(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setAuth(session.user.id, session.user.email ?? null);
      } else {
        clearAuthInfo();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const inAuthGroup = segments[0] === '(auth)';
    const isLoggedIn = !!userId;

    if (!isLoggedIn && !inAuthGroup) {
      router.replace('/(auth)');
    } else if (isLoggedIn && inAuthGroup) {
      router.replace('/(app)');
    }
  }, [userId, isInitialized, segments]);

  if (!isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <Slot />;
}