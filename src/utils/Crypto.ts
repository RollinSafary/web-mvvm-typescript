declare const symbolsMap: any;

export function encrypt(line: string): string {
  let encryptedString: string = '';
  for (let i: number = 0; i < line.length; i++) {
    encryptedString += symbolsMap[line[i]];
  }
  return encryptedString;
}

export function decrypt(line: string): string {
  let decryptedString: string = '';
  const keys: string[] = Object.keys(symbolsMap);
  const allPatterns: string[] = [];
  for (const key of keys) {
    allPatterns.push(symbolsMap[key]);
  }
  for (let i: number = 0; i < line.length / 3; i++) {
    const part: string = line.substring(i * 3, (i + 1) * 3);
    const index: number = allPatterns.findIndex(
      (value: string) => value === part,
    );
    decryptedString += keys[index];
  }
  return decryptedString;
}
