import { SquarePen, Trash2 } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { Dimensions, Modal, Pressable, StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';
import TextField from './TextField';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
const MENU_WIDTH = 220

interface MenuAction {
    id: string,
    title: string,
    destructive?: boolean,
}

interface AnimatedMenuProps {
    actions: MenuAction[],
    onPressAction: (id: string) => void,
    children: React.ReactElement<{ onPress?: () => void }>,
}

export default function AnimatedMenu({ actions, onPressAction, children }: AnimatedMenuProps) {
    const [visible, setVisible] = useState(false)
    const triggerRef = useRef<View>(null)

    const [menuLayout, setMenuLayout] = useState({ top: 0, left: 0 })

    const isDark = useColorScheme() === 'dark'

    const openMenu = () => {
        if (!triggerRef.current) return;

        triggerRef.current.measure((x, y, width, height, pageX, pageY) => {
            let topPosition = pageY + height - 5

            const approximateMenuHeight = actions.length * 44 + 8
            if (topPosition + approximateMenuHeight > SCREEN_HEIGHT) {
                topPosition = pageY - approximateMenuHeight - 16
            }

            let leftPosition = pageX - 10

            if (leftPosition + MENU_WIDTH > SCREEN_WIDTH) {
                leftPosition = SCREEN_WIDTH - MENU_WIDTH - 10
            }

            if (leftPosition < 16) {
                leftPosition = 16
            }

            setMenuLayout({ top: topPosition, left: leftPosition })
            setVisible(true)
        })
    }

    const closeMenu = (actionId?: string) => {
        setVisible(false)

        if (actionId) onPressAction(actionId)
    }


    return (
        <View ref={triggerRef} collapsable={false}>
            {React.cloneElement(children, { onPress: openMenu })}

            <Modal visible={visible} transparent animationType="fade">
                <Pressable style={styles.backdrop} onPress={() => closeMenu()} />

                <View
                    style={{ top: menuLayout.top, left: menuLayout.left, width: MENU_WIDTH }}
                    className={`rounded-xl ${isDark ? 'bg-zinc-700' : 'bg-gray-50'}`}
                >
                    {actions.map((action, index) => (
                        <View key={action.id} className=''>
                            <TouchableOpacity
                                className='p-4 flex-row justify-between'
                                onPress={() => closeMenu(action.id)}
                            >
                                <TextField text={action.title} className='text-xl' type={action.destructive ? 'destructive' : undefined} />

                                {action.destructive ? <Trash2 color='red' /> : <SquarePen color={isDark ? 'white' : 'black'} />}
                            </TouchableOpacity>
                            {index < actions.length - 1 && <View className='border-b border-gray-300' />}
                        </View>
                    ))}
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFillObject,
    },
})