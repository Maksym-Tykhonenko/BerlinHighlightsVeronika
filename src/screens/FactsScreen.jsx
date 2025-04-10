import Facts from '../components/Facts';
import LayoutScreen from './LayoutScreen';

const FactsScreen = () => {
    return (
        <LayoutScreen child={<Facts />} menu />
    )
};

export default FactsScreen;