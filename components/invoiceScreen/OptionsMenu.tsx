import { router } from "expo-router"
import { Ellipsis } from "lucide-react-native"
import { Alert, TouchableOpacity, useColorScheme } from "react-native"
import AnimatedMenu from "../shared/AnimatedMenu"

type Props = {
    screen: string,
}

export default function OptionsMenu({ screen }: Props) {
    const systemColorScheme = useColorScheme()

    const handleMenuSelect = (id: string) => {
        if (id === 'edit') {
            router.navigate({
                pathname: screen === 'invoice' ? '/createEditInvoice' : '/createEditClient',
                params: { type: 'Edit' }
            })
        } else {
            Alert.alert(
                `Delete ${screen}`,
                `Are you sure you want to delete this ${screen} ?`,
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