import { Client } from "@/lib/definitons";
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { Check, Plus } from 'lucide-react-native';
import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import InputField from '../shared/InputField';
import TextField from '../shared/TextField';

type Props = {
    clients: Client[] | undefined;
    selectedId: string | null;
    onSelect: (client: Client) => void;
};

export type ClientPickerSheetRef = {
    open: () => void;
    close: () => void;
};

export const ClientPickerSheet = forwardRef<ClientPickerSheetRef, Props>(
    ({ clients, selectedId, onSelect }, ref) => {
        const bottomSheetRef = useRef<BottomSheetModal>(null);
        const snapPoints = useMemo(() => ['85%'], []);
        const systemColorScheme = useColorScheme();
        const isDark = systemColorScheme === 'dark';

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
        );

        const handleAddNewClient = () => {
            bottomSheetRef.current?.dismiss()

            router.navigate({
                pathname: '/createEditClient',
                params: { type: 'New' }
            })
        }

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
                            <View className="w-12 h-12 rounded-full bg-blue-200 justify-center items-center">
                                <Text className="font-bold text-xl text-blue-600">{`${item.first_name[0]}${item.last_name && item.last_name[0]}`}</Text>
                            </View>
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
                            onPress={handleAddNewClient}
                            className="flex-row items-center gap-3 py-2"
                        >
                            <View className="w-9 h-9 rounded-full bg-zinc-200 items-center justify-center">
                                <Plus color="#6B7280" />
                            </View>
                            <TextField text="Add new client" />
                        </TouchableOpacity>
                    </View>
                </View>
            </BottomSheetModal>
        )
    }
)