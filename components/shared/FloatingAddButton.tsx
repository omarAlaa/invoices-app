import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Plus } from "lucide-react-native";
import { useState } from "react";
import { Modal, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import CreateEditClient from "../createEditClientScreen/CreateEditClient";
import CreateEditInvoice from "../createEditinvoiceScreen/CreateEditInvoice";

type Props = {
    animatedStyle: any;
    screen?: string;
    onPress?: () => void;
}

export default function FloatingAddButton({ animatedStyle, screen, onPress }: Props) {
    const [showClientModal, setShowClientModal] = useState(false)
    const [showInvoiceModal, setShowInvoiceModal] = useState(false)

    const handlePress = () => {
        if (onPress) onPress

        if (screen === 'client') {
            setShowClientModal(true)
        } else {
            setShowInvoiceModal(true)
        }
    }

    return (
        <Animated.View
            style={animatedStyle}
            className={`absolute ${screen === 'clientInvoices' ? 'bottom-16 right-12' : 'bottom-10 right-10'}`}
        >

            <TouchableOpacity onPress={handlePress} className="items-center justify-center w-20 h-20 rounded-full bg-blue-200 dark:bg-blue-950">
                <Plus size={40} color='#2563eb' />
            </TouchableOpacity>

            <Modal
                visible={showClientModal}
                animationType="slide"
                presentationStyle="pageSheet"
            >
                <CreateEditClient type='New' onClose={() => setShowClientModal(false)} />
            </Modal>

            <Modal
                visible={showInvoiceModal}
                animationType="slide"
                presentationStyle="pageSheet"
            >
                <BottomSheetModalProvider>
                    <CreateEditInvoice type='New' onClose={() => setShowInvoiceModal(false)} />
                </BottomSheetModalProvider>
            </Modal>
        </Animated.View>
    )
}