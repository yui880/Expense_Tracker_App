import AuthContent from '../components/Auth/AuthContent';
import {createUser} from '../util/auth';
import {useState} from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {authenticate} from '../store/auth-redux';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useDispatch();

  async function signupHandler({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      dispatch(authenticate(token));
    } catch (error) {
      Alert.alert('SignUp Failed!');
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating User..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
