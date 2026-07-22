import { Client } from "@/lib/definitons";
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { Check, Plus } from 'lucide-react-native';
import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Modal, TouchableOpacity, View, useColorScheme } from 'react-native';
import CreateEditClient from "../createEditClientScreen/CreateEditClient";
import Avatar from "../settingsScreen/Avatar";
import InputField from '../shared/InputField';
import TextField from '../shared/TextField';

type Props = {
    clients: Client[] | undefined;
    selectedId: string | undefined;
    onSelect: (client: Client) => void;
};

export type ClientPickerSheetRef = {
    open: () => void;
    close: () => void;
};

export const ClientPickerSheet = forwardRef<ClientPickerSheetRef, Props>(
    ({ clients, selectedId, onSelect }, ref) => {
        const bottomSheetRef = useRef<BottomSheetModal>(null)
        const snapPoints = useMemo(() => ['85%'], [])
        const systemColorScheme = useColorScheme()
        const isDark = systemColorScheme === 'dark'
        const [showClientModal, setShowClientModal] = useState(false)

        useImperativeHandle(ref, () => ({
            open: () => bottomSheetRef.current?.present(),
            close: () => bottomSheetRef.current?.dismiss(),
        }));

        const renderBackdrop = useCallback(
            (props: BottomSheetBackdropProps) => (
                <BottomSheetBackdrop
                    {...props}
                    disappearsOnIndex={-1}
                    appearsOnIndex={0}
                    pressBehavior="close"
                    style={{ backgroundColor: isDark ? 'black' : 'gray' }}
                />
            ),
            [isDark]
        )

        const renderItem = useCallback(
            ({ item }: { item: Client }) => {
                const isSelected = item.id === selectedId;
                return (
                    <TouchableOpacity
                        onPress={() => {
                            onSelect(item);
                            bottomSheetRef.current?.dismiss();
                        }}
                        className="flex-row items-center justify-between py-3"
                    >
                        <View className="flex-row items-center gap-3">
                            <Avatar
                                size='xs'
                                firstName={item.first_name}
                                lastName={item.last_name}
                                url={item.image_url}
                                isInvAvatar
                            />
                            <TextField text={`${item.first_name} ${item.last_name}`} />
                        </View>
                        {isSelected && <Check color="#2563EB" />}
                    </TouchableOpacity>
                );
            },
            [selectedId]
        );

        return (
            <BottomSheetModal
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                index={0}
                enableDynamicSizing={false}
                enablePanDownToClose
                backdropComponent={renderBackdrop}
                backgroundStyle={{ backgroundColor: isDark ? '#27272a' : '#f3f4f6' }}
            >
                <View className='flex-1 px-4 gap-4'>
                    <View className="pb-3 gap-2">
                        <TextField text="Select Client" className="font-bold text-lg" />

                        <InputField placeholder='Search' isSearch />
                    </View>

                    <BottomSheetFlatList
                        data={clients}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingBottom: 8 }}
                        ItemSeparatorComponent={() => (
                            <View className="h-px bg-gray-200 mx-1" />
                        )}
                    />

                    <View className="border-t border-gray-200 px-4 pt-3 pb-10">
                        <TouchableOpacity
                            onPress={() => setShowClientModal(true)}
                            className="flex-row items-center gap-3 py-2"
                        >
                            <View className="w-9 h-9 rounded-full bg-zinc-200 items-center justify-center">
                                <Plus color="#6B7280" />
                            </View>
                            <TextField text="Add new client" />
                        </TouchableOpacity>
                    </View>
                </View>

                <Modal
                    visible={showClientModal}
                    animationType="slide"
                    presentationStyle="pageSheet"
                >
                    <CreateEditClient type='New' onClose={() => setShowClientModal(false)} />
                </Modal>
            </BottomSheetModal>
        )
    }
)