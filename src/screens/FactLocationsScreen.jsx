import FactLocations from '../components/FactLocations';
import LayoutScreen from './LayoutScreen';

const FactLocationsScreen = ({ route }) => {
    const { category } = route.params;
    
    return (
        <LayoutScreen child={<FactLocations category={category} />} menu />
    )
};

export default FactLocationsScreen;