/**
 * Singleton Design Pattern
 *
 * Intent: Lets you ensure that a class has only one instance, while providing a
 * global access point to this instance.
 */

/**
 * The Repository class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
class Repository {
  private static instance: Repository;

  /**
   * The Repository's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Repository class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): Repository {
    if (!Repository.instance) {
      Repository.instance = new Repository();
    }

    return Repository.instance;
  }

  /**
   * Finally, any singleton should define some business logic, which can be
   * executed on its instance.
   */
  public someBusinessLogic() {
    // ...
  }
}

/**
 * The client code.
 */

// const repositoryInstanceOne = new Repository(); // Error
const repositoryInstanceOne = Repository.getInstance();
const repositoryInstanceTwo = Repository.getInstance();

if (repositoryInstanceOne === repositoryInstanceTwo) {
  console.log('Singleton works, both variables contain the same instance.');
} else {
  console.log('Singleton failed, variables contain different instances.');
}
