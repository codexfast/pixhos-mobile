import { 
    View, 
    TouchableOpacity, 
} from 'react-native';
import { Stack } from 'expo-router';
import { COLORS } from '../constants/theme';
import { useRouter } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'

import Form from '../components/settings/FormSets';

const GoBack  = () => {
    const router = useRouter();

    return (
        <TouchableOpacity onPress={() => router.back()}>
            <FontAwesomeIcon icon={faArrowLeft} color={COLORS.primary} size={25}/>
        </TouchableOpacity>
    );
}

const Settings = () => {
    return (
        <View style={{backgroundColor: COLORS.background, flex:1}}>

            <Stack.Screen
                options={{
                    headerTitle: 'Settings',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontFamily: 'ManropeRegular',
                        fontSize: 18
                    },
                    headerShadowVisible: false,
                    headerStyle:{
                        backgroundColor: COLORS.background
                    },
                    headerLeft: () => <GoBack />
                    
                }}
            />

            <Form />

        </View>
    );

};

export default Settings;