import MiniGame from '../components/MiniGame';
import LayoutScreen from './LayoutScreen';

const MiniGameScreen = () => {
    return (
        <LayoutScreen child={<MiniGame />} menu />
    )
};

export default MiniGameScreen;