import { InvoiceListRow } from "@/lib/definitons";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import Card from "../shared/Card";
import TextField from "../shared/TextField";

type Props = {
    invoice: InvoiceListRow | undefined;
}

export default function InvoiceInfo({ invoice }: Props) {
    if (invoice) {
        return (
            <Card>
                <Link href={{
                    pathname: '/client/[clientId]',
                    params: { clientId: invoice.client_id, fullName: `${invoice?.client_first_name} ${invoice?.client_last_name}` }
                }} asChild>
                    <TouchableOpacity className="flex-row gap-2 items-center">
                        <View className="w-12 h-12 rounded-full bg-blue-200 justify-center items-center">
                            <Text className="font-bold text-xl text-blue-600">
                                {`${invoice?.client_first_name[0]}${invoice?.client_last_name && invoice.client_last_name[0]}`}
                            </Text>
                        </View>

                        <View>
                            <TextField text={`${invoice?.client_first_name} ${invoice?.client_last_name}`} className="font-bold text-lg" />

                            <TextField text={invoice?.client_email} type="secondary" />
                        </View>
                    </TouchableOpacity>
                </Link>

                <View className="my-8 border-b border-gray-400" />

                <View className="flex-row justify-between">
                    <View>
                        <TextField text="Issued" type="secondary" />

                        <TextField text={invoice?.issue_date} className="font-bold text-lg" />
                    </View>

                    <View>
                        <TextField text="Due" type="secondary" />

                        <TextField text={invoice?.due_date} className="font-bold text-lg" />
                    </View>
                </View>
            </Card>
        )
    }
}