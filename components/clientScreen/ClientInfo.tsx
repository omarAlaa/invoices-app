import TextField from "@/components/shared/TextField";
import { Client } from "@/lib/definitons";
import { View } from "react-native";
import Avatar from "../settingsScreen/Avatar";

type Props = {
    client: Client;
}

export default function ClientInfo({ client }: Props) {
    return (
        <View className="items-center">
            <Avatar
                size='large'
                firstName={client.first_name}
                lastName={client.last_name}
                url={client.image_url}
                isInvAvatar
            />

            <TextField text={client?.email} type="secondary" className="text-lg" />

            <TextField text={client?.phone} type="secondary" className="text-lg" />
        </View>
    )
}