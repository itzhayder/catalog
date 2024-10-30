import { cn } from "@/utilities/cn";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

type TProps = {
    title: string;
    handlePress: () => void;
    containerStyles?: string;
    textStyles?: string;
    isLoading?: boolean;
};

const CustomButton = ({
    title,
    handlePress,
    containerStyles,
    textStyles,
    isLoading,
}: TProps) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={cn(
                `bg-primary rounded-xl min-h-[62px] flex flex-row justify-center items-center ${containerStyles} ${
                    isLoading ? "opacity-50" : ""
                }`,
            )}
            disabled={isLoading}
        >
            <Text
                className={cn(
                    `text-white font-psemibold text-lg ${textStyles}`,
                )}
            >
                {title}
            </Text>

            {isLoading && (
                <ActivityIndicator
                    animating={isLoading}
                    color="#fff"
                    size="small"
                    className="ml-2"
                />
            )}
        </TouchableOpacity>
    );
};

export default CustomButton;
