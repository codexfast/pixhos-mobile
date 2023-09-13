import {
    TextInput, View, StyleSheet, TouchableOpacity, Text,
    ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard
} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useState, useEffect } from "react";

import { COLORS } from "../../constants/theme";
import { useRouter } from "expo-router";

const styles = StyleSheet.create({
    container: {
        padding: 35,
        paddingTop: 50,
    },


    button: {
        height: 56,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8
    },

    input: {
        height: 56,
        width: "auto",
        borderRadius: 8,
        borderColor: "#CAD1DB",
        borderWidth: 1,
        // margin: 8,
        marginVertical: 5,
        paddingHorizontal: 16,
    }
});

const Form = () => {
    const placeholderTextColor = "#818A99";
    
    const [inputs, setInputs] = useState({
        key: null,
        owner: null,
        city: null,
        id: null
    })
    const router = useRouter();

    useEffect(() => {
        async function get_settings () {
            try {
                const pixhos_settings = await AsyncStorage.getItem('pixhos-settings');
                
                _ = JSON.parse(pixhos_settings);

                setInputs({
                    key: _.key,
                    owner: _.owner,
                    city: _.city,
                    id: _.id
                })


            } catch (error){
                alert("Erro ao buscar configurações")
            }
        }

        get_settings()

    }, [])


    const handleText = (value, ref) => {
        
        // new_input = inputs
        // new_input[ref] = value
        
        // setInputs(inputs)
        // console.log(inputs)

        new_inputs = {...inputs}
        new_inputs[ref] = value


        setInputs(new_inputs)


    }

    const saveBtn = async() => {
        try {
            const user_settings = JSON.stringify(inputs)
            await AsyncStorage.setItem('pixhos-settings', user_settings);

            router.back();
            
            alert('Salvo')

        } catch (error) {
            alert("Erro ao salvar configurações!")
        }
    }
    

    return (
        <ScrollView>
            <KeyboardAvoidingView
                behavior="position"    
                style={{backgroundColor: COLORS.background, flex:1}}
                keyboardVerticalOffset={-80}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <View>
                            <TextInput 
                                placeholder="Chave" 
                                style={styles.input} 
                                placeholderTextColor={placeholderTextColor}
                                maxLength={36} 
                                numberOfLines={1}
                                value={inputs.key}
                                onChangeText={value => handleText(value, 'key')}
                                autoCorrect={false}


                            />

                            <TextInput 
                                placeholder="Beneficiário" 
                                style={styles.input} 
                                placeholderTextColor={placeholderTextColor}
                                maxLength={36} 
                                numberOfLines={1}
                                value={inputs.owner}
                                onChangeText={value => handleText(value, 'owner')}
                                autoCorrect={false}



                            />

                            <TextInput 
                                placeholder="Cidade" 
                                style={styles.input} 
                                placeholderTextColor={placeholderTextColor}
                                maxLength={36} 
                                numberOfLines={1}
                                value={inputs.city}
                                onChangeText={value => handleText(value, 'city')}
                                autoCorrect={false}

                            />

                            <TextInput 
                                placeholder="Identificador" 
                                style={styles.input} 
                                placeholderTextColor={placeholderTextColor}
                                maxLength={36} 
                                numberOfLines={1}
                                value={inputs.id}
                                onChangeText={value => handleText(value, 'id')}
                                autoCorrect={false}


                            />

                        </View>

                        <View style={{marginTop:80}}>
                            <TouchableOpacity
                                style={{...styles.button, backgroundColor: COLORS.primary}}
                                onPress={saveBtn}
                            >
                                <Text style={{
                                    color: COLORS.background,
                                    fontFamily: "ManropeBold",
                                    fontSize: 16

                                }}>Salvar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{...styles.button}} onPress={() => router.back()}>
                                <Text style={{
                                    color: COLORS.primary,
                                    fontFamily: "ManropeBold",
                                    fontSize: 16
                                }}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

export default Form;
