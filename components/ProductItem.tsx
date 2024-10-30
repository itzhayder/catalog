import { IProduct } from "@/services/types";
import { Image, Text, TouchableOpacity, View } from "react-native";
import CartButtons from "./CartButtons";
import { router } from "expo-router";

const ProductItem = ({ item }: { item: IProduct }) => {
    const handlePressOnProduct = () => {
        router.push({
            pathname: "/products/[id]",
            params: {
                id: item.id,
                title: item.title,
            },
        });
    };

    return (
        <TouchableOpacity
            className="overflow-hidden border border-neutral-200 rounded-md"
            activeOpacity={0.7}
            onPress={handlePressOnProduct}
        >
            <View className="flex-row gap-3 bg-white">
                <View className="p-4 bg-white rounded-sm">
                    <Image
                        src={item.image}
                        className="w-20 h-20 bg-white "
                        resizeMode="contain"
                    />
                </View>
                <View className="flex-1 justify-between p-4 pl-1">
                    <Text className="font-pregular text-base" numberOfLines={2}>
                        {item.title}
                    </Text>
                    <View className="flex-row items-center pt-2 justify-between">
                        <Text className="font-psemibold text-primary">
                            ${item.price}
                        </Text>
                        <CartButtons item={item} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ProductItem;
