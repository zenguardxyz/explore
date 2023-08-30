export class AddressUtil {
  /**
   * Shortens the 64 digit addess
   */
  static shorternAddress(str: string) {
    let shortern =
      str.length > 10
        ? str.substr(0, 10) + "...." + str.substr(str.length - 10, str.length)
        : str;
    return shortern;
  }


  /** Digest format
   * sv[26 character id][64 character secret]
   * 
   **/ 
  static encodeSharableDigest(secret: string, safeId: string): string {

    return `sv${safeId}${secret}`;
  }

  static decodeSharableDigest(digest: string) {

    const safeId = digest.substr(2, 26);
    const secret = digest.substr(28, 66)

    return {id: safeId, secret: secret };

 
  }
}
