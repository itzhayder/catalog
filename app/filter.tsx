import CustomButton from "@/components/CustomButton";
import { clearProductFilter, setProductFilter } from "@/features/app/appSlice";
import { RootState } from "@/store/store";
import { cn } from "@/utilities/cn";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

type TFilter = {
    sort?: string;
};

const FILTERS = {
    sort: [
        { label: "ASC", value: "asc" },
        { label: "DESC", value: "desc" },
    ],
};

const initialFilterState: TFilter = {};

const Filter = () => {
    const appliedFilter = useSelector(
        (state: RootState) => state.app.productFilter,
    );
    const [filter, setFilter] = useState<TFilter>(appliedFilter);
    const dispatch = useDispatch();

    return (
        <View className="flex-1">
            <ScrollView className="p-4 flex-1">
                <Text className="font-psemibold text-lg">Sort By</Text>
                <View className="flex-row gap-4 mt-2">
                    {FILTERS.sort.map((item) => {
                        const isSelected = item.value === filter.sort;

                        return (
                            <TouchableOpacity
                                key={item.value}
                                className={cn(
                                    "border  px-4 py-1 rounded-md",
                                    isSelected
                                        ? "bg-primary-200 border-primary"
                                        : "border-neutral-300",
                                )}
                                onPress={() => {
                                    setFilter((prevFilter) => ({
                                        ...prevFilter,
                                        sort: item.value,
                                    }));
                                }}
                            >
                                <Text
                                    className={cn(
                                        "font-pmedium pt-0.5",
                                        isSelected ? "text-primary" : "",
                                    )}
                                >
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
            <View className="flex-row bg-white p-6 gap-2 rounded-t-3xl">
                <CustomButton
                    title="Reset"
                    handlePress={() => {
                        setFilter(initialFilterState);
                        dispatch(clearProductFilter());
                    }}
                    containerStyles="bg-white border border-primary flex-1"
                    textStyles="text-primary"
                />
                <CustomButton
                    title="Apply"
                    handlePress={() => {
                        dispatch(setProductFilter(filter));
                        router.back();
                    }}
                    containerStyles="flex-1"
                />
            </View>
        </View>
    );
};

export default Filter;
