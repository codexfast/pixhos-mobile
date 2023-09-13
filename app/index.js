import {
    Keyboard,
    View, 
    TouchableOpacity, 
    KeyboardAvoidingView, 
    TouchableWithoutFeedback, 
    ScrollView,
    Image,
    Text,
    Platform
} from "react-native";
import { Stack } from "expo-router";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog'
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { COLORS } from "./constants/theme";

import QRCodeViewer from "./components/home/QRCode";
import InputControl from "./components/home/InputControl";

import { PIX } from "./constants/pix";

import AsyncStorage from '@react-native-async-storage/async-storage';


async function get_settings () {
    try {
        const pixhos_settings = await AsyncStorage.getItem('pixhos-settings');
        return JSON.parse(pixhos_settings);
    } catch (error){

        return false
    }
}

function format_scheme(id, value) {
    return `${id}${value.length.toString().padStart(2, '0')}${value}`
}

function payloadPix(key, merchant_name, merchant_city, amount, txid) {
    const regex = /[^A-a-Z-z\[\]0-9$@%*+-\./:_\s]/

    const bcb = "BR.GOV.BCB.PIX"

    // merchant_name // max len(15)
    // merchant_city // max len(15)

    let raw = [
        format_scheme('00','01'),
        (function (){

            base_pix = format_scheme('00', bcb)
            pkey = format_scheme('01', key)

            return format_scheme('26', `${base_pix}${pkey}`)
        })(),
        format_scheme('52', '0000'),
        format_scheme('53', '986'),
        format_scheme('54', amount.toFixed(2)),
        format_scheme('58', 'BR'),
        format_scheme('59', merchant_name.replace(regex, '').normalize("NFD")),
        format_scheme('60', merchant_city.replace(regex, '').normalize("NFD")),
        format_scheme('62', format_scheme('05', txid.replace(regex, '').normalize('NFD'))),
        '6304'
    ]

    raw.push(PIX.CRC16(raw.join('')))

    return raw.join('')
}

const SettingsBtn = () => {
    const router = useRouter();
    
    return (
        <TouchableOpacity onPress={() => router.push('settings')}>
            <FontAwesomeIcon icon={faCog} color={COLORS.primary} size={25}/>
        </TouchableOpacity>
    )
};

const Main = ({config, setConfig}) => {

    
    const [qrcodeValue, setQRCodeValue] = useState('nothing');
    const [value, setValue] = useState(0)


    useEffect(() => {
        payload = payloadPix(
            config.key,
            config.owner,
            config.city,
            value,
            config.id
        )

        setQRCodeValue(payload)
    },[value])


    return (
        <ScrollView style={{backgroundColor: COLORS.background}}>

            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "position" : "height"}
                keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <QRCodeViewer 
                            qrcodeValue={qrcodeValue}
                        />
                        <InputControl value={value} setValue={setValue} qrcodeValue={qrcodeValue}/>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView >
    );
}

const NoFoundConfig = () => {
    return (
        <View style={{
            backgroundColor: COLORS.background,
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Image
                source={require('../assets/sets.png')}
                width={240}
                height={240}
            />
            
            <Text style={{
                padding: 20,
                fontSize: 24,
                fontFamily: 'ManropeBold',
                color: COLORS.primary
            }}>Need to Configure</Text>

        </View>
    );
}

const Home = () => {
    
    const [settings, setSettings] = useState(false)

    useEffect(() => {
        get_settings().then(settings => setSettings(settings))
    }, [])

    return (
        <>
            <Stack.Screen
                options={{
                    headerRight: () => <SettingsBtn />,
                    headerTitle: '',
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: COLORS.background
                    }
                }}
            />

            { settings ? <Main config={settings} setConfig={setSettings}/> : <NoFoundConfig />}
        </>
    );
}

export default Home;