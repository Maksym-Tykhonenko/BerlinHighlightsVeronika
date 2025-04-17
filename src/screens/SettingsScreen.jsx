import Settings from '../components/Settings';
import LayoutScreen from './LayoutScreen';

const SettingsScreen = () => {
    return (
        <LayoutScreen child={<Settings />} menu />
    )
};
//  <LayoutScreen child={<Settings />} menu />
export default SettingsScreen;