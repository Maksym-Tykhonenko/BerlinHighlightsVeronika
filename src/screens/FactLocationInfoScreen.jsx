import FactLocationInfo from '../components/FactLocationInfo';
import LayoutScreen from './LayoutScreen';

const FactLocationInfoScreen = ({ route }) => {
    const { location } = route.params;
    
    return (
        <LayoutScreen child={<FactLocationInfo location={location} />} menu />
    )
};

export default FactLocationInfoScreen;