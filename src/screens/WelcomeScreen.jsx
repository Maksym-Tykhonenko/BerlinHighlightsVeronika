import Welcome from '../components/Welcome';
import LayoutScreen from './LayoutScreen';

const WelcomeScreen = () => {
    return (
        <LayoutScreen child={<Welcome />} />
    )
};

export default WelcomeScreen;