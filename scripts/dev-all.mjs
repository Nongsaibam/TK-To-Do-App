import { spawn } from 'node:child_process';

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const commands = [
  {
    name: 'frontend',
    command: npmCommand,
    args: ['run', 'dev:frontend'],
    color: '\x1b[36m',
  },
  {
    name: 'backend',
    command: npmCommand,
    args: ['run', 'dev:backend'],
    color: '\x1b[35m',
  },
];

const reset = '\x1b[0m';
const children = commands.map(({ name, command, args, color }) => {
  const child = spawn(command, args, {
    cwd: process.cwd(),
    env: process.env,
    shell: process.platform === 'win32',
    stdio: ['inherit', 'pipe', 'pipe'],
  });

  const prefix = `${color}[${name}]${reset}`;
  child.stdout.on('data', (chunk) => process.stdout.write(`${prefix} ${chunk}`));
  child.stderr.on('data', (chunk) => process.stderr.write(`${prefix} ${chunk}`));
  child.on('exit', (code) => {
    if (code && !shuttingDown) {
      console.error(`${prefix} exited with code ${code}`);
      shutdown(code);
    }
  });

  return child;
});

let shuttingDown = false;

function shutdown(code = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  children.forEach((child) => {
    if (!child.killed) child.kill();
  });
  setTimeout(() => process.exit(code), 200);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));
