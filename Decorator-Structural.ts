/**
 * Decorator Design Pattern
 *
 * Intent: Lets you attach new behaviors to objects by placing these objects
 * inside special wrapper objects that contain the behaviors.
 */

/**
 * Interfaces
 */

interface IClothes {
  putOn(): void;
}

interface IHuman {
  putOn(): void;
}

/**
 * Concrete Implementations
 */

class BaseClothesDecorator implements IClothes {
  constructor(private clothes: IClothes) {}
  putOn(): void {
    this.clothes.putOn();
  }
}

class ShortsDecorator extends BaseClothesDecorator {
  putOn(): void {
    super.putOn();
    console.log('Putting shorts on');
  }
}

class TrousersDecorator extends BaseClothesDecorator {
  putOn(): void {
    super.putOn();
    console.log('Putting trousers on');
  }
}

class ShirtDecorator extends BaseClothesDecorator {
  putOn(): void {
    super.putOn();
    console.log('Putting shirt on');
  }
}

class SocksDecorator extends BaseClothesDecorator {
  putOn(): void {
    super.putOn();
    console.log('Putting socks on');
  }
}

class Human implements IHuman {
  putOn(): void {
    console.log('I am naked 👀 Woohoo!');
  }
}

/**
 * Client/Consumer Code
 */

// // Example 1
const meNaked = new Human();
// meNaked.putOn();

// Example 2
const meWithOnlyShortsOn = new ShortsDecorator(meNaked);
const meWithOnlyTrousersOn = new TrousersDecorator(meNaked);
const meWithOnlyShirtOn = new ShirtDecorator(meNaked);
const meWithOnlySocksOn = new SocksDecorator(meNaked);

// meWithOnlyShortsOn.putOn();
// meWithOnlyTrousersOn.putOn();
// meWithOnlyShirtOn.putOn();
// meWithOnlySocksOn.putOn();

const meWithShortsAndTrousersOn = new TrousersDecorator(meWithOnlyShortsOn);
// meWithShortsAndTrousersOn.putOn();

const meWithShortsAndShirtOn = new ShirtDecorator(meWithOnlyShortsOn);
// meWithShortsAndShirtOn.putOn();

const meWithShortsAndTrousersAndShirtOn = new TrousersDecorator(
  meWithShortsAndShirtOn
);
// meWithShortsAndTrousersAndShirtOn.putOn();

const meWithShortsAndTrousersAndShirtAndSocksOn = new SocksDecorator(
  meWithShortsAndTrousersAndShirtOn
);
// meWithShortsAndTrousersAndShirtAndSocksOn.putOn();
