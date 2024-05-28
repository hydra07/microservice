import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>(); //xac dinh kieu cua dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; //tra ve mot phan cua state
