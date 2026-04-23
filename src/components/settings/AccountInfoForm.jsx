import Button from '../common/Button';
import CardContainer from '../common/CardContainer';
import InputField from '../common/InputField';

export default function AccountInfoForm({ user }) {
  return (
    <CardContainer>
      <form className="space-y-4">
        <InputField id="account-name" label="Full Name" defaultValue={user.name} />
        <InputField id="account-email" label="Email" defaultValue={user.email} />
        <InputField id="account-role" label="Role" defaultValue={user.role} />
        <Button>Save changes</Button>
      </form>
    </CardContainer>
  );
}
