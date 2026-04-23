import { FiUserPlus } from 'react-icons/fi';
import members from '../../data/members';

export default function TeamInviteBar({ onInvite }) {
  return (
    <div className="flex flex-col gap-4 rounded-[8px] bg-transparent py-1 lg:flex-row lg:items-center lg:justify-end">
      <div className="flex items-center gap-3 self-start lg:self-auto">
        <div className="flex -space-x-2">
          {members.map((member, index) => (
            <div
              key={member.id}
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#111827] text-xs font-semibold text-white"
              title={member.name}
            >
              {index === members.length - 1 ? '+4' : member.name.slice(0, 1)}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={onInvite}
          className="inline-flex items-center gap-2 rounded-[6px] border border-[#d1d5db] px-4 py-2 text-sm font-semibold text-[#374151] transition hover:bg-[#f3f4f6]"
        >
          <FiUserPlus size={16} />
          Invite
        </button>
      </div>
    </div>
  );
}
