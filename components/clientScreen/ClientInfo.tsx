import TextField from "@/components/shared/TextField";
import { Client } from "@/lib/definitons";
import { Text, View } from "react-native";

type Props = {
    client: Client | undefined;
}

export default function ClientInfo({ client }: Props) {
    return (
        <View className="items-center">
            <View className="w-20 h-20 rounded-full bg-blue-200 justify-center items-center">
                <Text className="font-bold text-3xl text-blue-600">{`${client?.first_name[0]}${client?.last_name && client.last_name[0]}`}</Text>
            </View>

            <TextField text={client?.email} type="secondary" className="text-lg" />

            <TextField text={client?.phone} type="secondary" className="text-lg" />
        </View>
    )
}