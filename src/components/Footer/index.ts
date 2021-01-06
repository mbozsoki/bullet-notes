import { connect } from 'react-redux';
import { Footer } from './Footer';
import { addItem } from '../../store/slices/itemsSlice';

const mapStateToProps = (state: { currentDate: string }) => ({
    currentDate: state.currentDate,
});
const mapDispatch = { addItem };

export default connect(mapStateToProps, mapDispatch)(Footer);
