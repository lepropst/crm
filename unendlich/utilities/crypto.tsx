import sodium from "sodium-native";
import mysql from "mysql";
const secret_key = process.env.SECRET_KEY;

// var key = sodium.sodium_malloc(sodium.crypto_secretbox_KEYBYTES) // secure buffer

// insert random data into key

export class UnendlichCrypto {
  public static instance: UnendlichCrypto;
  private connection: any;
  private key: Bufffer;
  private nonce: Buffer;
  encrypt(str: string) {
    let message = Buffer.from(str);
    let ciphertext = Buffer.alloc(
      sodium.crypto_secretbox_MACBYTES + message.length
    );
    sodium.crypto_secretbox_easy(ciphertext, message, nonce, this.key);
  }
  decrypt() {
    // sodium.crypto_stream_chacha20_xor(c, m, n, secret_key)
  }
  private constructor() {
    this.nonce = Buffer.alloc(sodium.crypto_secretbox_NONCEBYTES);
    sodium.randombytes_buf(nonce); // insert random data into nonce
    let key = Buffer.alloc(sodium.crypto_secretbox_KEYBYTES);
    sodium.crypto_kdf_derive_from_key(key, getId);

    this.connection = mysql.createConnection({
      host: "localhost",
      user: "me",
      password: "secret",
      database: "my_db",
    });

    this.connection.connect();

    // connection.query(
    //   "SELECT 1 + 1 AS solution",
    //   function (error, results, fields) {
    //     if (error) throw error;
    //     console.log("The solution is: ", results[0].solution);
    //   }
    // );
  }

  private getId(): number {
    const result = this.connection.query(
      "COUNT(*) FROM crypto",
      function (error: Error, results: any[], fields: any[]) {
        if (error) {
          throw error;
        }
        console.log("The solution is: ", results[0].solution);
        return results[0];
      }
    );
    return result;
  }
  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): UnendlichCrypto {
    if (!UnendlichCrypto.instance) {
      UnendlichCrypto.instance = new UnendlichCrypto();
    }

    return UnendlichCrypto.instance;
  }
}
