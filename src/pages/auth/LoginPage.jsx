import AuthLayout from '../../components/auth/AuthLayout';
import LoginForm from '../../components/auth/LoginForm';
import signinIllustration from '../../assets/illustrations/singhin.svg';

export default function LoginPage() {
  return (
    <AuthLayout
      imageLabel="Sign in illustration"
      imageSrc={signinIllustration}
    >
      <LoginForm />
    </AuthLayout>
  );
}
