import AuthLayout from '../../components/auth/AuthLayout';
import RegisterForm from '../../components/auth/RegisterForm';
import signupIllustration from '../../assets/illustrations/singup.svg';

export default function RegisterPage() {
  return (
    <AuthLayout
    
      imageLabel="Register illustration"
      imageSrc={signupIllustration}
    >
      <RegisterForm />
    </AuthLayout>
  );
}
