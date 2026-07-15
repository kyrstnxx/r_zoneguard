const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const prisma = new PrismaClient();

const YEAR = '2026';
const ROLE_PREFIX = {
  ADMIN: 'ADM',
  DIRECTOR: 'DIR',
  COLLECTOR: 'COL',
  HOMEOWNER: 'HOM',
  TENANT: 'TEN',
};

function genId(prefix, seq) {
  return `${prefix}-${YEAR}-${String(seq).padStart(4, '0')}`;
}

function randomPassword(len = 8) {
  return crypto.randomBytes(Math.ceil(len / 2)).toString('hex').slice(0, len);
}

async function createUser({ seq, role, firstName, lastName, email }) {
  const prefix = ROLE_PREFIX[role];
  const user_id = genId(prefix, seq);
  const rawPassword = randomPassword(8);
  const password_hash = await bcrypt.hash(rawPassword, 12);

  const user = await prisma.user.create({
    data: {
      user_id,
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: '0000000000',
      date_of_birth: new Date('1990-01-01'),
      password_hash,
      system_role: role,
      account_status: 'ACTIVE',
    },
  });

  console.log(`${role} created: ${email} -> password: ${rawPassword}`);
  return user;
}

async function main() {
  console.log('Seeding initial users...');

  // Ensure id sequences per role start at 1 as requested
  await createUser({ seq: 1, role: 'ADMIN', firstName: 'Zone', lastName: 'Admin', email: 'admin@zoneguard.local' });
  await createUser({ seq: 1, role: 'DIRECTOR', firstName: 'District', lastName: 'Director', email: 'director@zoneguard.local' });
  await createUser({ seq: 1, role: 'COLLECTOR', firstName: 'Collection', lastName: 'Agent', email: 'collector@zoneguard.local' });
  await createUser({ seq: 1, role: 'HOMEOWNER', firstName: 'Home', lastName: 'Owner', email: 'homeowner@zoneguard.local' });
  await createUser({ seq: 1, role: 'TENANT', firstName: 'Tenant', lastName: 'Resident', email: 'tenant@zoneguard.local' });

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
