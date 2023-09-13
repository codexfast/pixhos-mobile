import {
    TextInput, TouchableOpacity, Text, StyleSheet, View, Share
} from "react-native";
import { COLORS } from "../../constants/theme";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'


const styles = StyleSheet.create({
    container: {
        padding: 25,
        marginBottom: 28, // (68 - 20 - 20)
        
    },

    shareBtn: {
        height: 56,
        width: "auto",
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        display:"flex",
        justifyContent:"center",
        alignItems: "center",
        marginTop: 18
    },

    shareText: {
        color: COLORS.background,
        fontFamily: "ManropeBold",
        fontSize: 16,
    },

    controlInput: {
        flexDirection: "row",
        height: 56,
        width: "auto",
        backgroundColor: COLORS.background,
        borderRadius: 8,
        borderColor: COLORS.primary,
        borderWidth: 1.5
    },
    
    controlInputBtn: {
        // backgroundColor:"#000",
        width: 48,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    controlTextInput: {
        flex: 1,
        textAlign: "center"
    }


});

function formatValue (value) {

    let BRL = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    return value ? BRL.format(value) : "R$ 0,00"
}

function plus(value, setValue) {
    if (value < (100 * 100 * 100)) {
        setValue(value + 1);
    }
}

function minus(value, setValue) {
    if ((value -1) >6) {
        setValue(value - 1);
    }
}

const InputControl = ({ value, setValue, qrcodeValue }) => {
    return (
        <View style={styles.container}>
            <View style={styles.controlInput}>
                <TouchableOpacity style={styles.controlInputBtn} onPress={() => minus(value, setValue)}>
                    <FontAwesomeIcon icon={faMinus} />
                </TouchableOpacity>
                <TextInput
                    style={styles.controlTextInput}
                    keyboardType="numeric"
                    value={formatValue(value)}
                    onChangeText={new_value => {
                        
                        let res = new_value.replace(/\D/g, "");
                        let value = parseInt(res) / 100
                        
                        // setValue(formatValue(value))
                        
                        setValue(value)
                    }}
                
                />
                <TouchableOpacity style={styles.controlInputBtn} onPress={() => plus(value, setValue)}>
                    <FontAwesomeIcon icon={faPlus} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.shareBtn} onPress={() => {
                // qrcodeValue
                Share.share({
                    message: qrcodeValue
                })
            }}>
                <Text style={styles.shareText}>Share</Text>
            </TouchableOpacity>
        </View>
    );
}

export default InputControl;