#!/usr/bin/env node
/**
 * Genera un hash bcrypt para la contraseña del admin.
 * Uso: node scripts/hash-password.js TU_CONTRASEÑA
 * Luego pega el resultado en ADMIN_PASSWORD_HASH en tu .env.local
 */
const bcrypt = require('bcryptjs');

const password = process.argv[2];
if (!password) {
  console.error('Uso: node scripts/hash-password.js TU_CONTRASEÑA');
  process.exit(1);
}

bcrypt.hash(password, 12).then((hash) => {
  console.log('\nHash generado:');
  console.log(hash);
  console.log('\nCopia esta línea en tu .env.local:');
  console.log(`ADMIN_PASSWORD_HASH=${hash}`);
});
