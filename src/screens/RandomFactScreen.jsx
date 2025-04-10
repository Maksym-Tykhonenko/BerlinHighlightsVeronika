import RandomFact from '../components/RandomFact';
import LayoutScreen from './LayoutScreen';

const RandomFactScreen = () => {
    return (
        <LayoutScreen child={<RandomFact />} menu />
    )
};

export default RandomFactScreen;