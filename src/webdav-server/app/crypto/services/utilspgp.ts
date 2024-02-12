import { getOpenpgp } from './pgp.service.ts';

export async function isValid(key: string): Promise<boolean> {
  try {
    const openpgp = await getOpenpgp();
    await openpgp.readKey({ armoredKey: key });
    return true;
  } catch (error) {
    return false;
  }
}
