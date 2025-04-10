import { View, Dimensions } from 'react-native';
import NavigationPanel from '../components/NavigationPanel';

const { height } = Dimensions.get('window');

const LayoutScreen = ({ child, menu }) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
            <View style={{flex: 1}}>{child}</View>
            {
                menu && (
                    <View style={{width: '100%', position: 'absolute', bottom: 0}}>
                        <NavigationPanel />
                    </View>
                )
            }
        </View>
    )
};

export default LayoutScreen;