import { connect } from 'react-redux';
import { removeItem, setItemLabel, setItemSaved } from '../../store/slices/itemsSlice';
import { ListItem } from './ListItem';

const mapDispatch = { removeItem, setItemSaved, setItemLabel };

export default connect(null, mapDispatch)(ListItem);
