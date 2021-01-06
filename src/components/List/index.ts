import { connect } from 'react-redux';
import { Item } from '../../models/item';
import { ItemType } from '../../models/item-type';
import { List } from './List';
import { setItemState } from '../../store/slices/itemsSlice';

const mapStateToProps = (state: {
    items: Item[];
    tabItemFilter: ItemType;
    currentDate: string;
}) => ({
    activeTab: state.tabItemFilter,
    currentDate: state.currentDate,
});
const mapDispatch = { setItemState };

export default connect(mapStateToProps, mapDispatch)(List);
