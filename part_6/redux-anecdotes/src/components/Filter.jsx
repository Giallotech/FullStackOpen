import { useDispatch } from 'react-redux';
import { filterAction } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    const filter = event.target.value;
    console.log('filter', filter);
    // dispatch the action to the reducer
    dispatch(filterAction(filter));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
