import { badRequest, ok, options } from '../../../lib/response.js';
import { createMember, listMembers } from '../../../lib/store.js';

export const OPTIONS = options;

export async function GET() {
  const members = await listMembers();
  return ok({ items: members, total: members.length });
}

export async function POST(request) {
  const body = await request.json();
  const email = body.email?.trim();

  if (!email) {
    return badRequest('Email is required');
  }

  const members = await listMembers();
  const exists = members.some((member) => member.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    return badRequest('This member is already invited.');
  }

  const member = await createMember({ ...body, email });
  return ok({ item: member, message: 'Invite sent' });
}
