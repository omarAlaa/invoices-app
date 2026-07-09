import TextField from "@/components/shared/TextField";
import { useClient } from "@/features/clients/api";
import { Text, View } from "react-native";

type Props = {
    clientId: string | string[];
}

export default function ClientInfo({ clientId }: Props) {
    const { data: clientInfo, isLoading, isError, refetch, isRefetching } = useClient(clientId.toString())

    return (
        <View className="items-center">
            <View className="w-20 h-20 rounded-full bg-blue-200 justify-center items-center">
                <Text className="font-bold text-3xl text-blue-600">{`${clientInfo?.first_name[0]}${clientInfo?.last_name && clientInfo.last_name[0]}`}</Text>
            </View>

            <TextField text={clientInfo?.email} type="secondary" className="text-lg" />

            <TextField text={clientInfo?.phone} type="secondary" className="text-lg" />
        </View>
    )
}