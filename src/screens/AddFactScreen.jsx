import AddFact from '../components/AddFact';
import LayoutScreen from './LayoutScreen';

const AddFactScreen = ({ route }) => {
    const { item } = route.params || {};
    
    return (
        <LayoutScreen child={<AddFact item={item} />} />
    )
};

export default AddFactScreen;