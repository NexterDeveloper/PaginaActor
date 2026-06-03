#!/usr/bin/env node
/**
 * Genera un hash SHA-256 para la contraseña del admin.
 * Uso: node scripts/hash-password.js TU_CONTRASEÑA
 * Luego pega el resultado en ADMIN_PASSWORD_HASH en tu .env.local
 */
const { createHash } = require('crypto');

const password = process.argv[2];
if (!password) {
  console.error('Uso: node scripts/hash-password.js TU_CONTRASEÑA');
  process.exit(1);
}

const hash = createHash('sha256').update(password, 'utf8').digest('hex');
console.log('\nHash SHA-256 generado:');
console.log(hash);
console.log('\nCopia esta línea en tu .env.local:');
console.log(`ADMIN_PASSWORD_HASH=${hash}`);
