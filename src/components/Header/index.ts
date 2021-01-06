import { connect } from 'react-redux';
import { setCurrentDate } from '../../store/slices/currentDateSlice';
import { Header } from './Header';

const mapStateToProps = (state: { currentDate: string }) => ({
    currentDate: state.currentDate,
});
const mapDispatchToProps = { setCurrentDate };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
