import AddLocation from '../components/AddLocation';
import LayoutScreen from './LayoutScreen';

const AddLocationScreen = ({ route }) => {
    const { item } = route.params || {};
    
    return (
        <LayoutScreen child={<AddLocation item={item} />} />
    )
};

export default AddLocationScreen;