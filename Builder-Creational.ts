/**
 * Builder Design Pattern
 *
 * Intent: Lets you construct complex objects step by step. The pattern allows
 * you to produce different types and representations of an object using the
 * same construction code.
 */

/**
 * Interfaces
 */
interface IBurgerBuilder {
  addBun(): void;
  addBurger(): void;
  addCheese(): void;
}

/**
 * Concrete Implementations
 */
class McDonaldsRestaurant implements IBurgerBuilder {
  constructor(private burger: McDonaldsBurger) {}

  public reset(): void {
    this.burger = new McDonaldsBurger();
  }

  public addBun(): void {
    this.burger.ingredients.push('Mcdonalds Bun added🥖');
  }

  public addBurger(): void {
    this.burger.ingredients.push('Mcdonalds burger added🥩');
  }

  public addCheese(): void {
    this.burger.ingredients.push('Mcdonalds cheese added🧀');
  }

  public getBurger(): McDonaldsBurger {
    const result = this.burger;
    this.reset();
    return result;
  }
}

class KFCRestaurant implements IBurgerBuilder {
  constructor(private burger: KFCBurger) {}

  public reset(): void {
    this.burger = new KFCBurger();
  }

  public addBun(): void {
    this.burger.ingredients.push('KFC Bun added🥖');
  }

  public addBurger(): void {
    this.burger.ingredients.push('KFC burger added🥩');
  }

  public addCheese(): void {
    this.burger.ingredients.push('KFC cheese added🧀');
  }

  public getBurger(): KFCBurger {
    const result = this.burger;
    this.reset();
    return result;
  }
}

class McDonaldsBurger {
  public ingredients: string[] = [];

  public listParts(): void {
    console.log(
      `McDonalds burger ingredients: ${this.ingredients.join(', ')}\n`
    );
  }
}

class KFCBurger {
  public ingredients: string[] = [];

  public listParts(): void {
    console.log(`KFC burger ingredients: ${this.ingredients.join(', ')}\n`);
  }
}

class FastFoodWorker {
  constructor(private fastFoodRestaurant: IBurgerBuilder) {}

  public changeRestaurant(fastFoodRestaurant: IBurgerBuilder): void {
    this.fastFoodRestaurant = fastFoodRestaurant;
  }

  public buildMinimalBurger(): void {
    this.fastFoodRestaurant.addBun();
  }

  public buildFullBurger(): void {
    this.fastFoodRestaurant.addBun();
    this.fastFoodRestaurant.addBurger();
    this.fastFoodRestaurant.addCheese();
  }
}

/**
 * Client/Consumer Code
 */

const mcDonaldsBurger = new McDonaldsBurger();
const kfcBurger = new KFCBurger();

// // McDonalds
const leedsMcDonalds = new McDonaldsRestaurant(mcDonaldsBurger);
const wakefieldKFC = new KFCRestaurant(kfcBurger);
const huddersfieldKFC = new KFCRestaurant(kfcBurger);

const john_doe = new FastFoodWorker(leedsMcDonalds);
const jane_doe = new FastFoodWorker(wakefieldKFC);
const harry_doe = new FastFoodWorker(huddersfieldKFC);

// console.log('Standard basic McDonalds burger:');
// john_doe.buildMinimalBurger();
// leedsMcDonalds.getBurger().listParts();

// console.log('Standard full McDonalds burger:');
// john_doe.buildFullBurger();
// leedsMcDonalds.getBurger().listParts();

// // Remember, the Builder pattern can be used without a FastFoodWorker class.
// console.log('Custom McDonalds burger:');
// leedsMcDonalds.addBun();
// leedsMcDonalds.addBurger();
// leedsMcDonalds.getBurger().listParts();

// KFC
// jane_doe.changeRestaurant(huddersfieldKFC);
// console.log('Standard basic KFC burger:');
// jane_doe.buildMinimalBurger();
// wakefieldKFC.getBurger().listParts();

// console.log('Standard full KFC burger:');
// harry_doe.buildFullBurger();
// huddersfieldKFC.getBurger().listParts();

// // Remember, the Builder pattern can be used without a FastFoodWorker class.
// console.log('Custom KFC burger:');
// wakefieldKFC.addBun();
// wakefieldKFC.addBurger();
// wakefieldKFC.getBurger().listParts();
