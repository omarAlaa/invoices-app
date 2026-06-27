import { useScrollFAB } from "@/hooks/useScrollFAB"
import { Client, ClientsSection } from "@/lib/definitons"
import { MOCK_CLIENTS } from "@/lib/placeholder-data"
import { groupByLetter } from "@/lib/utils"
import { User } from "lucide-react-native"
import { useCallback, useMemo } from "react"
import { SectionList, SectionListRenderItemInfo, View } from "react-native"
import FloatingAddButton from "../shared/FloatingAddButton"
import TextField from "../shared/TextField"
import ClientOverview from "./ClientOverview"

export default function ClientsList() {
    const { onScroll, buttonStyle } = useScrollFAB()
    const sections = useMemo(() => groupByLetter(MOCK_CLIENTS), [MOCK_CLIENTS])

    const renderItem = useCallback(
        ({ item }: SectionListRenderItemInfo<Client>) => <ClientOverview client={item} />,
        [],
    );

    const renderSectionHeader = useCallback(
        ({ section }: { section: ClientsSection }) => <TextField text={section.title} type="secondary" />,
        [],
    );

    return (
        <View className="flex-1 mb-[-4rem]">
            <SectionList<Client, ClientsSection>
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
            />

            <FloatingAddButton animatedStyle={buttonStyle} screen="client" />
        </View>
    )
}