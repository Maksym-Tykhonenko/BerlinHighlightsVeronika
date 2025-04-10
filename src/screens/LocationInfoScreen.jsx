import LocationInfo from '../components/LocationInfo';
import LayoutScreen from './LayoutScreen';

const LocationInfoScreen = ({ route }) => {
    const { item } = route.params;
    
    return (
        <LayoutScreen child={<LocationInfo item={item} />} />
    )
};

export default LocationInfoScreen;