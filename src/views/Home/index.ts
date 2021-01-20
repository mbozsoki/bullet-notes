import { Home } from './Home';
import { setItems } from '../../store/slices/itemsSlice';
import { connect } from 'react-redux';

const mapToProps = {
    setItems,
};

export default connect(null, mapToProps)(Home);
