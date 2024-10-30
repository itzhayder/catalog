import { useGetProductListQuery } from "@/services/productApi";
import {
    FlatList,
    RefreshControl,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import ProductItem from "./ProductItem";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

const ProductList = () => {
    const filter = useSelector((state: RootState) => state.app.productFilter);
    const numberOfActiveFilters = Object.values(filter)?.length || 0;

    const { data, isLoading, refetch, isFetching, error } =
        useGetProductListQuery(filter);
    const [offlineData, setOfflineData] = useState([]);
    const [isConnected, setIsConnected] = useState(true);

    const handleClickOnFilter = () => {
        router.push("/filter");
    };

    // const persistData = async () => {
    //     try {
    //         await AsyncStorage.setItem("product-list", JSON.stringify(data));
    //     } catch (e) {}
    // };

    // const getPersistData = async () => {
    //     try {
    //         const jsonValue = await AsyncStorage.getItem("product-list");
    //         return jsonValue != null ? JSON.parse(jsonValue) : [];
    //     } catch (e) {}
    // };

    // const prepareOfflineData = async () => {
    //     const persistedData = await getPersistData();
    //     setOfflineData(persistedData);
    // };

    // Persist product list in storage for showing later in offline mode
    // useEffect(() => {
    //     if (!data) return;
    //     persistData();
    // }, [data]);

    // useEffect(() => {
    //     prepareOfflineData();
    // }, []);

    const handleNetwork = async (state) => {
        setIsConnected(state.isConnected);
    };

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            if (!isConnected && state.isConnected) {
                refetch();
            }
            setIsConnected(state.isConnected!);
        });

        return () => {
            unsubscribe?.();
        };
    }, []);

    if (isLoading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <FlatList
            // extraData={{ isConnected }}
            keyExtractor={(item) => `${item.id}`}
            // data={isConnected ? data : offlineData}
            data={data}
            contentContainerClassName="gap-4 p-4"
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
                return <ProductItem item={item} />;
            }}
            refreshControl={
                <RefreshControl refreshing={isFetching} onRefresh={refetch} />
            }
            ListHeaderComponent={
                <View className="gap-4">
                    {/* <Text className="text-5xl font-psemibold leading-tight">
                        What would you like to shopping
                    </Text> */}
                    <View className="flex-row gap-4">
                        {/* <Modal visible /> */}
                        <TextInput
                            className="bg-white p-4 rounded-md flex-1"
                            placeholder="Search product"
                            placeholderTextColor="#ccc"
                        />
                        <TouchableOpacity
                            className="bg-white p-4 rounded-md"
                            onPress={handleClickOnFilter}
                        >
                            <View className="relative">
                                <FontAwesome
                                    name="filter"
                                    size={24}
                                    color="black"
                                />
                                {numberOfActiveFilters ? (
                                    <View className="w-5 h-5 justify-center items-center bg-primary rounded-full absolute -top-2 -right-2.5">
                                        <Text className="text-white font-psemibold leading-snug">
                                            {numberOfActiveFilters}
                                        </Text>
                                    </View>
                                ) : (
                                    <></>
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        />
    );
};

export default ProductList;
