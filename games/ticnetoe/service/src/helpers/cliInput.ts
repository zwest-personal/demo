/**
 * Shamelessly stolen from StackOverflow as a TS friendly promisified input
 */
import {createInterface} from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const cliInput = (questionText: string) =>
  new Promise<string>(resolve => rl.question(questionText, resolve))
    .finally(() => rl.close());

export default cliInput;