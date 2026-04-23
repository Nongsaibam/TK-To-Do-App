import CardContainer from '../common/CardContainer';

export default function ProfileCard({ user }) {
  return (
    <CardContainer className="text-center">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#ffe2d8] text-3xl font-semibold text-coralDark">
        {user.name[0]}
      </div>
      <h3 className="mt-4 text-xl font-semibold text-slateInk">{user.name}</h3>
      <p className="mt-1 text-sm text-muted">{user.role}</p>
      <p className="mt-4 rounded-2xl bg-panel px-4 py-3 text-sm text-muted">{user.email}</p>
    </CardContainer>
  );
}
