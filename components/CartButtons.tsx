import { addItem, removeItem } from "@/features/cart/cartSlice";
import { ICartProduct } from "@/services/types";
import { AppDispatch, RootState } from "@/store/store";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInRight, FadeOutRight } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";

const CartButtons = ({ item }: { item: ICartProduct }) => {
    const itemInCart = useSelector(
        (state: RootState) => state.cart.items[item?.id],
    );

    const dispatch = useDispatch<AppDispatch>();

    const handleAddToCart = () => {
        dispatch(addItem(item));
    };

    const handleRemoveToCart = () => {
        dispatch(removeItem(item));
    };

    return (
        <View className="flex-row items-center gap-2">
            {itemInCart?.quantity && (
                <Animated.View
                    entering={FadeInRight.springify(900)
                        .damping(80)
                        .stiffness(200)
                        .delay(100)}
                    exiting={FadeOutRight.springify()
                        .damping(80)
                        .stiffness(200)
                        .delay(50)}
                >
                    <TouchableOpacity
                        className="w-10 h-10 pt-0.5 justify-center items-center border border-primary rounded-md"
                        onPress={handleRemoveToCart}
                    >
                        <Text className="text-primary font-pbold text-lg">
                            -
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            )}
            {itemInCart?.quantity && (
                <Animated.Text
                    className="w-7 text-center font-psemibold text-lg"
                    entering={FadeInRight.springify(900)
                        .damping(80)
                        .stiffness(200)}
                    exiting={FadeOutRight.springify()
                        .damping(80)
                        .stiffness(200)}
                    key={itemInCart.quantity}
                >
                    {itemInCart.quantity}
                </Animated.Text>
            )}
            <TouchableOpacity
                className="z-10 w-10 h-10 pt-0.5 justify-center items-center bg-primary rounded-md"
                onPress={handleAddToCart}
            >
                <Text className="text-white font-pbold text-lg">+</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CartButtons;
