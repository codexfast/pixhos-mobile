import QRCode from "react-native-qrcode-svg";
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: "center",
        padding: 20,
        // flexGrow: 1,
    },
    subtitle: {
        padding: 20,
        fontSize: 24,
        fontFamily: 'ManropeBold',
        color: COLORS.primary
    }
});

const QRCodeViewer = ({ qrcodeValue }) => {
    
    return (
        <View style={{...styles.container, marginTop: 15}}>
            <QRCode
                value={qrcodeValue}
                // value={"asdsdasdas"}
                color={COLORS.primary}
                backgroundColor={COLORS.background}
                size={236}
                
            />
            <Text style={styles.subtitle}>QR Code Pix</Text>
        </View>
    )
}

export default QRCodeViewer;
