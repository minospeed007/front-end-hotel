import { connect } from 'react-redux';
import { increment, decrement } from '../action/action';

const Count = ({ count, increment, decrement }) => {
    return (
        <div>
            <h2>count: {count}</h2>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        count: state.counter.count
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        increment: () => dispatch(increment()),
        decrement: () => dispatch(decrement())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Count);
