class Key {
  /**
   * The signature of the key
   */
  private signature: string;

  constructor() {
    this.signature = Math.random().toString(36);
  }

  /**
   * Returns the signature of the key
   * @returns {string}
   */
  getSignature(): string {
    return this.signature;
  }
}

class Person {
  constructor(
    /**
     * The key of the person
     */
    private key: Key
  ) {}

  /**
   * Returns the key of the person
   * @returns {Key}
   */
  getKey(): Key {
    return this.key;
  }
}

abstract class House {
  constructor(
    /**
     * The key of the house
     */
    protected key: Key,
    /**
     * true if the door is open
     */
    protected door: boolean = false,
    /**
     * The tenants of the house
     */
    protected tenants: Person[] = []
  ) {}

  /**
   * Adds persont to the tenants list
   * if the door is open
   *
   * @param person
   */
  public comeIn(person: Person): void {
    if (this.door) {
      this.tenants.push(person);
    } else {
      throw new Error("The door is closed");
    }
  }

  public abstract openDoor(key: Key): void;
}

class MyHouse extends House {
  /**
   * The key of the house
   * @param key
   */
  constructor(key: Key) {
    super(key);
  }

  /**
   * Opens the door if the key is valid
   * @param key
   * @throws {Error} if the key is not valid
   * @returns {void}
   */
  public openDoor(key: Key): void {
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
    } else {
      throw new Error("The key is not valid");
    }
  }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

export {};
