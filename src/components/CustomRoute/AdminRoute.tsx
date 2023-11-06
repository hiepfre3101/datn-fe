import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IAuth } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';

type Props = {
   children: React.ReactElement;
};

const AdminRoute = ({ children }: Props) => {
   const auth = useSelector((state: { userReducer: IAuth }) => state.userReducer);
   const navigate = useNavigate();
   useEffect(() => {
      console.log(auth.user.role);
      if (auth.user.role !== 'admin') {
         console.log(auth.user.role);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [auth]);
   return <>{children}</>;
};

export default AdminRoute;
