import { randomBytes } from 'crypto';

function dateStamp(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}${month}${day}`;
}

function suffix() {
  return randomBytes(3).toString('hex').toUpperCase();
}

export function createServiceRequestReference() {
  return `OH-CNX-${dateStamp()}-${suffix()}`;
}

export function createTechnicianApplicationReference() {
  return `TECH-CNX-${dateStamp()}-${suffix()}`;
}
