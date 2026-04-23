import Button from '../common/Button';
import CardContainer from '../common/CardContainer';
import InputField from '../common/InputField';

export default function ChangePasswordForm() {
  return (
    <CardContainer>
      <form className="space-y-4">
        <InputField id="current-password" type="password" label="Current Password" />
        <InputField id="new-password" type="password" label="New Password" />
        <InputField id="confirm-password" type="password" label="Confirm Password" />
        <Button>Update password</Button>
      </form>
    </CardContainer>
  );
}
