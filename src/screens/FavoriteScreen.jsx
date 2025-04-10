import Favorite from '../components/Favorite';
import LayoutScreen from './LayoutScreen';

const FavoriteScreen = () => {
    return (
        <LayoutScreen child={<Favorite />} />
    )
};

export default FavoriteScreen;