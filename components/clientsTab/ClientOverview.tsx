import { Client } from "@/features/clients/api";
import { Link } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import TextField from "../shared/TextField";

export default function ClientOverview({ client }: { client: Client }) {
    return (
        <Link href={{
            pathname: '/client/[clientId]',
            params: { clientId: client.id, fullName: `${client.first_name} ${client.last_name}` }
        }} asChild>
            <TouchableOpacity className="flex-row justify-between items-center py-4 mt-1 border-t border-gray-300">
                <View className="flex-row gap-2 items-center">
                    <View className="w-12 h-12 rounded-full bg-blue-200 justify-center items-center">
                        <Text className="font-bold text-xl text-blue-600">OA</Text>
                    </View>

                    <View>
                        <TextField text={`${client.first_name} ${client.last_name}`} className="font-bold text-lg" />

                        <TextField
                            text={`${client.email} `}
                            type="secondary" />
                    </View>
                </View>

                <ChevronRight color="#d4d4d4" />
            </TouchableOpacity>
        </Link>
    )
}