/**
 * Factory Method Design Pattern
 *
 * Intent: Provides an interface for creating objects in a superclass, but
 * allows subclasses to alter the type of objects that will be created.
 */

/**
 * The ToyFactory class declares the factory method that is supposed to return an
 * object of a Toy class. The ToyFactory's subclasses usually provide the
 * implementation of this method.
 */
abstract class ToyFactory {
  /**
   * Note that the ToyFactory may also provide some default implementation of the
   * factory method.
   */
  public abstract factoryMethod(): Toy;

  /**
   * Also note that, despite its name, the ToyFactory's primary responsibility is
   * not creating toys. Usually, it contains some core business logic that
   * relies on Toy objects, returned by the factory method. Subclasses can
   * indirectly change that business logic by overriding the factory method
   * and returning a different type of toy from it.
   */
  public someOperation(): string {
    // Call the factory method to create a Toy object.
    const toy = this.factoryMethod();
    // Now, use the toy.
    return `ToyFactory: The same toyFactory's code has just worked with ${toy.operate()}`;
  }
}

/**
 * Concrete Creators override the factory method in order to change the
 * resulting toy's type.
 */
class KafiToys extends ToyFactory {
  /**
   * Note that the signature of the method still uses the abstract toy
   * type, even though the concrete toy is actually returned from the
   * method. This way the ToyFactory can stay independent of concrete toy
   * classes.
   */
  public factoryMethod(): Toy {
    return new Doll();
  }
}

class SimbaSmobyToys extends ToyFactory {
  public factoryMethod(): Toy {
    return new Car();
  }
}

/**
 * The Toy interface declares the operations that all concrete toys must
 * implement.
 */
interface Toy {
  operate(): string;
}

/**
 * Concrete Products provide various implementations of the Toy interface.
 */
class Doll implements Toy {
  public operate(): string {
    return '{Doll is operating}';
  }
}

class Car implements Toy {
  public operate(): string {
    return '{Car is operating}';
  }
}

/**
 * The client code works with an instance of a concrete toyFactory, albeit through
 * its base interface. As long as the client keeps working with the toyFactory via
 * the base interface, you can pass it any toyFactory's subclass.
 */
function clientCode(toyFactory: ToyFactory) {
  // ...
  console.log(
    "Client: I'm not aware of the toyFactory's class, but it still works."
  );
  console.log(toyFactory.someOperation());
  // ...
}

/**
 * The Application picks a toyFactory's type depending on the configuration or
 * environment.
 */
// console.log('App: Launched with the KafiToys.');
// clientCode(new KafiToys());
// console.log('');

console.log('App: Launched with the SimbaSmobyToys.');
clientCode(new SimbaSmobyToys());
