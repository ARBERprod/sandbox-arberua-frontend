import { useSelector } from 'react-redux';
import { getRawUserData } from '../selectors/getRawUserData';

export const useUser = () => useSelector(getRawUserData);
