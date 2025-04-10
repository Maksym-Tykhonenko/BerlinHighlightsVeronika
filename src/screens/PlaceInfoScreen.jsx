import PlaceInfo from '../components/PlaceInfo';
import LayoutScreen from './LayoutScreen';

const PlaceInfoScreen = ({ route }) => {
    const { place } = route.params;
    
    return (
        <LayoutScreen child={<PlaceInfo place={place} />} />
    )
};

export default PlaceInfoScreen;