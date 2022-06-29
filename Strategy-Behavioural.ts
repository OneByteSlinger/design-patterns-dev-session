/**
 * Strategy Design Pattern
 *
 * Intent: Lets you define a family of algorithms, put each of them into a
 * separate class, and make their objects interchangeable.
 */

/**
 * The Context defines the interface of interest to clients.
 */
class ExtractDataService {
  /**
   * @type {Strategy} The Context maintains a reference to one of the Strategy
   * objects. The Context does not know the concrete class of a strategy. It
   * should work with all strategies via the Strategy interface.
   */

  /**
   * Usually, the Context accepts a strategy through the constructor, but also
   * provides a setter to change it at runtime.
   */
  constructor(private strategy: Strategy) {}

  /**
   * Usually, the Context allows replacing a Strategy object at runtime.
   */
  public setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  /**
   * The Context delegates some work to the Strategy object instead of
   * implementing multiple versions of the algorithm on its own.
   */
  public doSomeBusinessLogic(): void {
    // ...

    console.log(
      `ExtractDataService: extracting data using ${this.strategy} strategy (not sure how it'll do it)`
    );
    const result = this.strategy.extractData(['c', 'e', 'a', 'd', 'b']);
    console.log(result.join(','));
  }
}

/**
 * The Strategy interface declares operations common to all supported versions
 * of some algorithm.
 *
 * The Context uses this interface to call the algorithm defined by Concrete
 * Strategies.
 */
interface Strategy {
  extractData(data: string[]): string[];
}

/**
 * Concrete Strategies implement the algorithm while following the base Strategy
 * interface. The interface makes them interchangeable in the Context.
 */
class RoomDataStrategy implements Strategy {
  public extractData(data: string[]): string[] {
    return data.sort();
  }
}

class DeskDataStrategy implements Strategy {
  public extractData(data: string[]): string[] {
    return data.reverse();
  }
}

class SensorDataStrategy implements Strategy {
  public extractData(data: string[]): string[] {
    return data.sort().reverse();
  }
}

/**
 * The client code picks a concrete strategy and passes it to the context. The
 * client should be aware of the differences between strategies in order to make
 * the right choice.
 */
// const extractDataService = new ExtractDataService(new RoomDataStrategy());
// console.log('Client: Strategy is set to RoomDataStrategy.');
// extractDataService.doSomeBusinessLogic();

// console.log('');

// console.log('Client: Strategy is set to DeskDataStrategy.');
// extractDataService.setStrategy(new DeskDataStrategy());
// extractDataService.doSomeBusinessLogic();

// console.log('');

// console.log('Client: Strategy is set to SensorDataStrategy.');
// extractDataService.setStrategy(new SensorDataStrategy());
// extractDataService.doSomeBusinessLogic();
