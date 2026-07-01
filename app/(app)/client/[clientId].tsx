import ClientInfo from "@/components/clientScreen/ClientInfo";
import CLientInvoices from "@/components/clientScreen/ClientInvoices";
import ClientStatusCards from "@/components/clientScreen/ClientStatusCards";
import OptionsMenu from "@/components/invoiceScreen/OptionsMenu";
import FloatingAddButton from "@/components/shared/FloatingAddButton";
import { useScrollFAB } from "@/hooks/useScrollFAB";
import { Stack, useLocalSearchParams } from "expo-router";
import { useColorScheme, View } from "react-native";
import Animated from "react-native-reanimated";

export default function ClientScreen() {
    const { clientId } = useLocalSearchParams()
    const systemColorScheme = useColorScheme()
    const { scrollHandler, buttonStyle } = useScrollFAB()

    return (
        <View className="px-8">
            <Animated.ScrollView
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                contentContainerClassName="gap-4 pt-4 pb-16"
            >
                <Stack.Screen
                    options={{
                        title: `${clientId}`,
                        headerBackButtonDisplayMode: 'minimal',
                        headerShadowVisible: false,
                        headerRight: () => <OptionsMenu screen="client" />
                    }}
                />

                <ClientInfo />

                <ClientStatusCards />

                <CLientInvoices />
            </Animated.ScrollView>

            <FloatingAddButton animatedStyle={buttonStyle} screen="clientInvoices" />
        </View>
    )
}