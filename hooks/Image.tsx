import { useState } from "react";
import {
    Image as OriginalImage,
    StyleProp,
    ImageStyle,
    ImageSourcePropType,
} from "react-native";

export default function Image(state: {
    failedImage: ImageSourcePropType;
    successImage: ImageSourcePropType;
    styles?: StyleProp<ImageStyle>;
    className?: string;
}) {
    const [imageError, setImageError] = useState(false);

    return (
        <OriginalImage
            style={state.styles}
            className={state.className}
            source={imageError ? state.failedImage : state.successImage}
            onError={() => setImageError(true)}
        />
    );
}
