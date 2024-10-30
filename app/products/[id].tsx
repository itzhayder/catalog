import CartButtons from "@/components/CartButtons";
import { useGetProductDetailsQuery } from "@/services/productApi";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Link, router, useLocalSearchParams } from "expo-router";
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";

const ProductDetails = () => {
    const { id, title } = useLocalSearchParams();
    const { data, isLoading } = useGetProductDetailsQuery(id);
    const { height } = useWindowDimensions();

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    return (
        <View className="flex-1">
            <ScrollView className="flex-1">
                <View className="bg-white p-10 relative">
                    <Image
                        source={{ uri: data?.image }}
                        // style={{ ...StyleSheet.absoluteFillObject }}
                        style={{ width: "100%", height: height / 2 }}
                        resizeMode="contain"
                    />
                    <TouchableOpacity
                        className="absolute top-10 left-4 bg-black w-12 h-12 rounded-full items-center justify-center"
                        onPress={() => {
                            router.back();
                        }}
                    >
                        <Ionicons name="chevron-back" size={20} color="white" />
                    </TouchableOpacity>
                </View>

                <View className="p-4 gap-4">
                    <Text className="font-psemibold text-3xl leading-tight">
                        {title}
                    </Text>

                    <View className="flex-row justify-between items-center">
                        <View className="bg-[#ffd5c9] px-2 py-1 rounded-md">
                            <Text className="font-pmedium text-xs pt-0.5">
                                {data?.category}
                            </Text>
                        </View>
                        <View className="flex-row gap-2 items-center">
                            <AntDesign name="star" size={18} color="#FE724C" />
                            <Text className="font-psemibold text-primary text-lg pt-1.5">
                                {data?.rating.rate}
                            </Text>
                        </View>
                    </View>
                    <Text className="font-plight leading-relaxed whitespace-normal text-neutral-500">
                        {data?.description}
                    </Text>
                </View>
            </ScrollView>

            <View className="flex-row justify-between bg-white p-6 gap-2 rounded-t-3xl">
                <Text className="font-psemibold text-3xl text-primary">
                    ${data?.price}
                </Text>
                <CartButtons item={data} />
            </View>
        </View>
    );
};

export default ProductDetails;
