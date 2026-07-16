import { formatCurrency } from "@/lib/utils";
import { View } from "react-native";
import Card from "../shared/Card";
import TextField from "../shared/TextField";

type Props = {
    revenue: number | undefined;
    oustanding: number | undefined;
    invoicesSent: number | undefined;
    avgValue: number | undefined;
}

export default function StatsCard({ revenue, oustanding, invoicesSent, avgValue }: Props) {
    return (
        <View className="gap-2">
            <View className="flex-row justify-between gap-4">
                <Card >
                    <TextField text="Revenue" type="secondary" />

                    <TextField text={formatCurrency(revenue)} className="font-bold text-lg" />
                </Card>

                <Card >
                    <TextField text="Owed" type="secondary" />

                    <TextField text={formatCurrency(oustanding)} className="font-bold text-lg" />
                </Card>
            </View>

            <View className="flex-row justify-between gap-4">
                <Card >
                    <TextField text="Avg. value" type="secondary" />

                    <TextField text={formatCurrency(avgValue)} className="font-bold text-lg" />
                </Card>

                <Card >
                    <TextField text="Invoices sent" type="secondary" />

                    <TextField text={invoicesSent} className="font-bold text-lg" />
                </Card>
            </View>
        </View>
    )
}