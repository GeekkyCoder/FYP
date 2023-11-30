import { useContext } from 'react';
import { AuthContext } from 'src/context/auth/auth.context';

const useAuth = () => {
  const { user,setUser } = useContext(AuthContext);

  return {
    user,
    setUser
  };
};

export default useAuth;
