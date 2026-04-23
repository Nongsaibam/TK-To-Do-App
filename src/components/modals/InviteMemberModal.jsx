import { useEffect, useState } from 'react';
import { FiCheck, FiCopy, FiSend, FiX } from 'react-icons/fi';
import defaultMembers from '../../data/members';
import { memberApi } from '../../services/api';

const projectLink = 'https://sharelinkhereandthere.com/34565yy29';
const roleOptions = ['Can edit', 'Can view', 'Owner'];

function initials(nameOrEmail) {
  const name = nameOrEmail.split('@')[0].replace(/[._-]/g, ' ');
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export default function InviteMemberModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('neerajgurung99@gmail.com');
  const [members, setMembers] = useState(defaultMembers);
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    memberApi
      .list()
      .then((data) => {
        if (isMounted) setMembers(data.items);
      })
      .catch(() => {
        if (isMounted) setMembers(defaultMembers);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  async function handleInvite(event) {
    event.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;

    const exists = members.some((member) => member.email.toLowerCase() === trimmedEmail.toLowerCase());
    if (exists) {
      setMessage('This member is already invited.');
      return;
    }

    const fallbackMember = {
      id: Date.now(),
      name: trimmedEmail.split('@')[0].replace(/[._-]/g, ' '),
      email: trimmedEmail,
      role: 'Can edit',
    };

    try {
      const data = await memberApi.invite({ email: trimmedEmail });
      setMembers((current) => [data.item, ...current]);
      setMessage('Invite sent.');
    } catch (error) {
      if (error.message?.includes('already')) {
        setMessage(error.message);
        return;
      }
      setMembers((current) => [fallbackMember, ...current]);
      setMessage('Invite saved locally. Start backend to sync.');
    } finally {
      setEmail('');
    }
  }

  function handleRoleChange(memberId, role) {
    setMembers((current) =>
      current.map((member) => (member.id === memberId ? { ...member, role } : member))
    );
    memberApi.update(memberId, { role }).catch(() => {});
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(projectLink);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-3 py-4">
      <div className="flex max-h-[88vh] w-full max-w-[520px] flex-col overflow-hidden rounded-[8px] border border-[#e5e7eb] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.25)]">
        <div className="flex items-start justify-between gap-3 border-b border-[#e5e7eb] p-4">
          <div>
            <h3 className="text-lg font-semibold text-[#111827]">Send an invite</h3>
            <p className="mt-1 text-xs text-[#6b7280]">Invite teammates and manage access.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 items-center gap-1.5 rounded-[6px] border border-[#e5e7eb] px-2.5 text-xs font-semibold text-[#374151]"
          >
            <FiX size={14} />
            Go Back
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <form onSubmit={handleInvite} className="rounded-[8px] border border-[#e5e7eb] bg-[#f9fafb] p-3">
            <label className="mb-1.5 block text-xs font-semibold text-[#111827]">Email</label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setMessage('');
                }}
                type="email"
                className="h-9 flex-1 rounded-[6px] border border-[#d1d5db] bg-white px-3 text-sm outline-none focus:border-[#111827]"
                placeholder="neerajgurung99@gmail.com"
              />
              <button
                type="submit"
                className="inline-flex h-9 items-center justify-center gap-2 rounded-[6px] bg-[#111827] px-3 text-xs font-semibold text-white"
              >
                <FiSend size={14} />
                Send Invite
              </button>
            </div>
            {message ? <p className="mt-2 text-xs font-medium text-[#374151]">{message}</p> : null}
          </form>

          <section className="mt-4">
            <h4 className="text-sm font-semibold text-[#111827]">Members</h4>
            <div className="mt-2 divide-y divide-[#f3f4f6] rounded-[8px] border border-[#e5e7eb] bg-white">
              {members.map((member) => (
                <div key={member.id} className="flex flex-col gap-2 px-3 py-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#111827] text-[11px] font-semibold text-white">
                      {initials(member.name || member.email)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#111827]">{member.name}</p>
                      <p className="truncate text-xs text-[#6b7280]">{member.email}</p>
                    </div>
                  </div>

                  <select
                    value={member.role}
                    onChange={(event) => handleRoleChange(member.id, event.target.value)}
                    className="h-8 rounded-[6px] border border-[#d1d5db] bg-white px-2.5 text-xs font-semibold text-[#374151] outline-none focus:border-[#111827]"
                  >
                    {roleOptions.map((role) => (
                      <option key={role}>{role}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-4 rounded-[8px] border border-[#e5e7eb] bg-[#f9fafb] p-3">
            <label className="mb-1.5 block text-xs font-semibold text-[#111827]">Project Link</label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                readOnly
                value={projectLink}
                className="h-9 flex-1 rounded-[6px] border border-[#d1d5db] bg-white px-3 text-xs text-[#374151] outline-none"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex h-9 items-center justify-center gap-2 rounded-[6px] border border-[#e5e7eb] bg-white px-3 text-xs font-semibold text-[#374151]"
              >
                {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
                {copied ? 'Copied' : 'Copy Link'}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
