import ClientOverview from "@/components/clientsTab/ClientOverview"
import ClientsHeader from "@/components/clientsTab/ClientsHeader"
import FloatingAddButton from "@/components/shared/FloatingAddButton"
import TextField from "@/components/shared/TextField"
import { useScrollFAB } from "@/hooks/useScrollFAB"
import { Client, ClientsSection } from "@/lib/definitons"
import { MOCK_CLIENTS } from "@/lib/placeholder-data"
import { groupByLetter } from "@/lib/utils"
import { Stack } from "expo-router"
import { User } from "lucide-react-native"
import { useCallback, useMemo, useState } from "react"
import { RefreshControl, SectionList, SectionListRenderItemInfo, View } from "react-native"
import Animated from "react-native-reanimated"

export default function Clients() {
    const { onScroll, buttonStyle, titleStyle, onHeaderLayout } = useScrollFAB()
    const sections = useMemo(() => groupByLetter(MOCK_CLIENTS), [MOCK_CLIENTS])
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = () => {
        setRefreshing(true)

        setTimeout(() => {
            setRefreshing(false)
        }, 2000)
    }

    const renderItem = useCallback(
        ({ item }: SectionListRenderItemInfo<Client>) => <ClientOverview client={item} />,
        [],
    );

    const renderSectionHeader = useCallback(
        ({ section }: { section: ClientsSection }) => <TextField text={section.title} type="secondary" />,
        [],
    );

    return (
        <View className="flex-1 px-8">
            <Stack.Screen
                options={{
                    headerTitle: () => (
                        <Animated.Text
                            style={titleStyle}
                            className="font-semibold text-xl dark:text-white"
                        >
                            Clients
                        </Animated.Text>
                    ),
                }}
            />

            <SectionList<Client, ClientsSection>
                ListHeaderComponent={
                    <View className="mb-4">
                        <View onLayout={onHeaderLayout}>
                            <ClientsHeader />
                        </View>

                        <TextField text="24 clients · $42,180 billed all-time" type="secondary" className="text-lg" />
                    </View>
                }
                onScroll={onScroll}
                scrollEventThrottle={16}
                sections={sections}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                stickySectionHeadersEnabled
                ListEmptyComponent={
                    <View className="items-center mt-24">
                        <User size={40} color="#d4d4d4" />
                        <TextField text="No clients yet" />
                    </View>
                }
                contentContainerStyle={{ paddingBottom: 100 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />

            <FloatingAddButton animatedStyle={buttonStyle} screen="client" />
        </View>
    )
}