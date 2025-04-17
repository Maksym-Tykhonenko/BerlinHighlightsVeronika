import Locations from '../components/Locations';
import LayoutScreen from './LayoutScreen';

const LocationsScreen = () => {
    return (
        <LayoutScreen child={<Locations />} menu />
    )
};
// <LayoutScreen child={<Locations />} menu />
export default LocationsScreen;