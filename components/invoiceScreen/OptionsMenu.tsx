import { router } from "expo-router"
import { Ellipsis } from "lucide-react-native"
import { Alert, TouchableOpacity, useColorScheme } from "react-native"
import AnimatedMenu from "../shared/AnimatedMenu"

export default function OptionsMenu() {
    const systemColorScheme = useColorScheme()

    const handleMenuSelect = (id: string) => {
        if (id === 'edit') {
            router.navigate({
                pathname: '/createEditInvoice',
                params: { type: 'Edit' }
            })
        } else {
            Alert.alert(
                "Delete Invoice",
                "Are you sure you want to delete this invoice?",
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "Delete",
                        style: "destructive",
                        onPress: () => { }
                    }
                ]
            )
        }
    }

    return (
        <AnimatedMenu
            onPressAction={handleMenuSelect}
            actions={[
                { id: 'edit', title: 'Edit' },
                { id: 'delete', title: 'Delete', destructive: true },
            ]}
        >
            <TouchableOpacity className="flex-1 justify-center items-end w-14">
                <Ellipsis color={systemColorScheme === 'dark' ? 'white' : 'black'} />
            </TouchableOpacity>
        </AnimatedMenu>
    )
}