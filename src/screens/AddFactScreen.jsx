import AddFact from '../components/AddFact';
import LayoutScreen from './LayoutScreen';

const AddFactScreen = ({ route }) => {
    const { fact } = route.params || {};
    
    return (
        <LayoutScreen child={<AddFact fact={fact} />} />
    )
};

export default AddFactScreen;