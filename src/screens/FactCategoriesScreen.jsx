import FactCategories from '../components/FactCategories';
import LayoutScreen from './LayoutScreen';

const FactCategoriesScreen = ({ route }) => {
    const { item } = route.params;
    
    return (
        <LayoutScreen child={<FactCategories item={item} />} menu />
    )
};

export default FactCategoriesScreen;