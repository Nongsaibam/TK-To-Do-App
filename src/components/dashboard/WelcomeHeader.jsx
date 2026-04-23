import { FiArrowUpRight } from 'react-icons/fi';
import CardContainer from '../common/CardContainer';
import Button from '../common/Button';

export default function WelcomeHeader({ user }) {
  return (
    <CardContainer className="overflow-hidden bg-gradient-to-r from-[#fff7f3] to-white">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-coralDark">Daily overview</p>
          <h1 className="mt-3 text-3xl font-semibold text-slateInk">Hi {user.name}, ready to finish strong?</h1>
          <p className="mt-3 max-w-2xl text-muted">
            Track priority work, invite teammates, and keep every deadline visible from one clean dashboard.
          </p>
        </div>
        <Button className="self-start">
          Open board
          <FiArrowUpRight />
        </Button>
      </div>
    </CardContainer>
  );
}
