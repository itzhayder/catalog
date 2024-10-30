import * as Location from "expo-location";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setLocation } from "@/features/user/userSlice";

const useLocation = () => {
    const location = useSelector((state: RootState) => state.user.location);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            dispatch(setLocation(location));
        })();
    }, [dispatch]);

    return { location };
};

export default useLocation;
