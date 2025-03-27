import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/shared/config/store/makeStore';

export const useAppDispatch = () => useDispatch<AppDispatch>();
