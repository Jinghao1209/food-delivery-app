import axios from "axios";
import { useEffect } from "react";
import { Text, View } from "react-native";
import API from "../../constants/API";
import { useUserStore } from "../../store/userStore";

interface MultipartFile {
    name: string;
    size: number;
    type: string;
    data: any;
}

export default function EditAccount() {
    const userData = useUserStore((state) => state.data);

    useEffect(() => {
        const formData = new FormData();
        const dataURI =
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANwAAADcCAMAAAAshD+zAAAAGFBMVEX///8AADMzM2YAABpmZpn/AAAAAAD/mQDIlViZAAABDUlEQVR4nO3d2Q3DQAhAQTtn/x2nAT4sgdjFmdcADA1wHJIkSZIkSbpl76DVO5UFNzW4qcFNDW5qcFODmxrc1OCmBje1FtwZ9EgUzfgEfYPg4ODg4ODg4ODg4ODg4ODgdsBlIK+LXQWXBwcHBwcHBwcHBwcHBwcHB1cEyeC2AsPBwcHBwcHBwcHBwcHBwcE14zrAcHBwcHBwcHBwcHBwcHBwcLvinkGrwHBwcHBwcHBwcHBwcHBwcHCTcNXgTHBwcHBwcHBwcHBwcHBwcHA74DLg6iOUQ+Dg4ODg4ODg4ODg4ODg4OCaix4CZY6wDBIFBwfXGxwcXG9wcHC9wcHB9QYHtyFOkiRJkiTpT/oB3jXE4YLstKAAAAAASUVORK5CYII=";

        formData.append("id", userData.user?.id ?? "");
        // MultipartFile
        formData.append("file", {
            uri: dataURI,
            type: "image/jpeg",
            name: "avatar.jpg",
        } as any);

        axios
            .post(API.POST_AVATAR, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log(res.data);
            });

        axios
            .get(API.GET_AVATAR + userData.user?.id, {
                responseType: "arraybuffer",
            })
            .then((res) => {
                const data = res.data;
                const avatarBlob = new Blob([data], { type: "image/jpeg" });
                const avatarUri = URL.createObjectURL(avatarBlob);

                console.log(data, avatarUri);
            });
    }, []);

    return (
        <View>
            <Text>Edit acc</Text>
        </View>
    );
}
