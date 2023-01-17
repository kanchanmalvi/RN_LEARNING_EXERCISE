import {useSelector} from 'react-redux';

export default ApiMethod = async () => {
  const settoken = useSelector(state => state?.authToken?.token?.token);

};
