import { addItem, removeItem } from "@/features/cart/cartSlice";
import { ICartProduct } from "@/services/types";
import { AppDispatch } from "@/store/store";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import CartButtons from "./CartButtons";

const CartItem = ({ item }: { item: ICartProduct }) => {
    return (
        <View className="overflow-hidden border border-neutral-200 rounded-md">
            <View className="flex-row gap-3">
                <View className="p-4 bg-white rounded-sm">
                    <Image
                        src={item.image}
                        className="w-20 h-20 bg-white "
                        resizeMode="contain"
                    />
                </View>
                <View className="flex-1 justify-between p-2">
                    <Text className="font-plight" numberOfLines={2}>
                        {item.title}
                    </Text>
                    <View className="flex-row items-center justify-between">
                        <Text className="font-plight">
                            ${(item.price * item?.quantity).toFixed(2)}
                        </Text>
                        <CartButtons item={item} />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default CartItem;
