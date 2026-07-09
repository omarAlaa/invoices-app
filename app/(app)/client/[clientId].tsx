import ClientInfo from "@/components/clientScreen/ClientInfo";
import CLientInvoices from "@/components/clientScreen/ClientInvoices";
import ClientStatusCards from "@/components/clientScreen/ClientStatusCards";
import OptionsMenu from "@/components/invoiceScreen/OptionsMenu";
import FloatingAddButton from "@/components/shared/FloatingAddButton";
import { useScrollFAB } from "@/hooks/useScrollFAB";
import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import Animated from "react-native-reanimated";

export default function ClientScreen() {
    const { clientId, fullName } = useLocalSearchParams()
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
                        title: `${fullName}`,
                        headerBackButtonDisplayMode: 'minimal',
                        headerShadowVisible: false,
                        headerRight: () => <OptionsMenu screen="client" />
                    }}
                />

                <ClientInfo clientId={clientId} />

                <ClientStatusCards clientId={clientId} />

                <CLientInvoices />
            </Animated.ScrollView>

            <FloatingAddButton animatedStyle={buttonStyle} screen="clientInvoices" />
        </View>
    )
}