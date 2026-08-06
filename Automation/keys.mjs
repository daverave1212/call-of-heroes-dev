
import crypto from 'node:crypto';
import { Command } from 'commander';
import { getAllDocuments, setDocument } from './Firebase/firebase.mjs';

const program = new Command();

program
  .name('keys')
  .description('CLI tool to manage activation keys')
  .version('1.0.0');

program
  .command('generate')
  .description('Generate new activation keys')
  .option('-e, --expiration <date>', 'Expiration date (YYYY-MM-DD)')
  .option('-p, --prefix <string>', 'Key prefix')
  .option('-n, --number <number>', 'How many keys to generate', 10)
  .requiredOption('-s, --set <string>', 'Set id for the key (e.g. "core")')
  .action((options) => {
    console.log('Generating keys...');
    console.log('Set:', options.set);
    console.log('Expiration:', options.expiration);
    console.log('Prefix:', options.prefix);
    console.log('Number:', options.number);
    onGenerate(options)
  });

program.parse(process.argv);




// 32-character alphabet excluding 0, O, 1, I to prevent user typos
const ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';

function generateActivationKey(blocks = 4, blockLength = 5) {
  const totalChars = blocks * blockLength;
  const randomBytes = crypto.randomBytes(totalChars);
  let keyChars = '';

  for (let i = 0; i < totalChars; i++) {
    // Map random byte to our custom alphabet
    keyChars += ALPHABET[randomBytes[i] % ALPHABET.length];
  }

  // Format into chunks separated by hyphens (e.g., A23F-K89M-P23X-Y78Z)
  return keyChars.match(new RegExp(`.{1,${blockLength}}`, 'g')).join('-');
}
async function onGenerate(options) {
  const keysObjs = await getAllDocuments('activation-codes')
  const keys = keysObjs.map(obj => obj.id)

  const existsKey = key => keys.includes(key)

  const newKeysObjs = []

  let i = 1
  while (i <= options.number) {

    let key = generateActivationKey()
    if (options.prefix != null) {
      key = options.prefix + key
    }
    if (existsKey(key)) {
      continue
    }

    const newKeyObj = {
      code: key,
      set: options.set
    }
    if (options.expiration != null) {
      newKeyObj.expiration = options.expiration
    }

    newKeysObjs.push(newKeyObj)
    i++
  }

  for (let i = 0; i < newKeysObjs.length; i++) {
    const keyObj = newKeysObjs[i]
    console.log(`Setting key ${i}`)
    await setDocument('activation-codes', keyObj.code, keyObj)
  }

  console.log(`✅ Done. Generated ${newKeysObjs.length} keys for set ${options.set}`)
}