import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { members as seedMembers, tasks as seedTasks, users as seedUsers } from '../data/mockData.js';

const dbPath = path.join(process.cwd(), 'data', 'runtime-db.json');

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

async function writeDb(db) {
  await mkdir(path.dirname(dbPath), { recursive: true });
  await writeFile(dbPath, JSON.stringify(db, null, 2));
}

export async function readDb() {
  try {
    return JSON.parse(await readFile(dbPath, 'utf8'));
  } catch {
    const db = { users: clone(seedUsers), tasks: clone(seedTasks), members: clone(seedMembers) };
    await writeDb(db);
    return db;
  }
}

function ensureMembers(db) {
  if (!Array.isArray(db.members)) {
    db.members = clone(seedMembers);
  }
  return db;
}

export async function listUsers() {
  const db = await readDb();
  return db.users;
}

export async function saveUsers(users) {
  const db = await readDb();
  db.users = users;
  await writeDb(db);
  return db.users;
}

export async function listTasks() {
  const db = await readDb();
  return db.tasks;
}

export async function listMembers() {
  const db = ensureMembers(await readDb());
  await writeDb(db);
  return db.members;
}

export async function createMember(payload) {
  const db = ensureMembers(await readDb());
  const nextId = Math.max(0, ...db.members.map((member) => Number(member.id) || 0)) + 1;
  const email = payload.email?.trim();
  const member = {
    id: nextId,
    name: payload.name || email.split('@')[0].replace(/[._-]/g, ' '),
    email,
    role: payload.role || 'Can edit',
  };

  db.members.unshift(member);
  await writeDb(db);
  return member;
}

export async function updateMember(id, updates) {
  const db = ensureMembers(await readDb());
  const index = db.members.findIndex((member) => Number(member.id) === Number(id));
  if (index === -1) return null;
  db.members[index] = { ...db.members[index], ...updates };
  await writeDb(db);
  return db.members[index];
}

export async function createTask(payload) {
  const db = await readDb();
  const nextId = Math.max(0, ...db.tasks.map((task) => Number(task.id) || 0)) + 1;
  const task = {
    id: nextId,
    createdAt: new Date().toISOString().slice(0, 10),
    dueDate: payload.dueDate || new Date().toISOString().slice(0, 10),
    status: 'Not Started',
    priority: 'Moderate',
    category: 'General',
    assignee: 'Current User',
    thumbnail: 'meeting',
    description: '',
    ...payload,
  };

  db.tasks.unshift(task);
  await writeDb(db);
  return task;
}

export async function updateTask(id, updates) {
  const db = await readDb();
  const index = db.tasks.findIndex((task) => Number(task.id) === Number(id));

  if (index === -1) {
    return null;
  }

  db.tasks[index] = { ...db.tasks[index], ...updates };
  await writeDb(db);
  return db.tasks[index];
}

export async function deleteTask(id) {
  const db = await readDb();
  const index = db.tasks.findIndex((task) => Number(task.id) === Number(id));

  if (index === -1) {
    return null;
  }

  const [removed] = db.tasks.splice(index, 1);
  await writeDb(db);
  return removed;
}
