/**
 * Adapter Design Pattern
 *
 * Intent: Provides a unified interface that allows objects with incompatible
 * interfaces to collaborate.
 */

/**
 * Interfaces
 */

interface IUKPlug {
  getUKPlug(): void;
}

interface IEUPlug {
  getEUPlug(): void;
}

interface IUKEUOneWayPlugAdapter extends IEUPlug {}
interface IEUUKOneWayPlugAdapter extends IUKPlug {}
interface IUKEUTowWayPlugAdapter extends IUKPlug, IEUPlug {}

/**
 * Concrete Implementations
 */
class UKPlug implements IUKPlug {
  getUKPlug(): void {
    console.log('🔌I am a UK plug🔌');
  }
}
class EUPlug implements IEUPlug {
  getEUPlug(): void {
    console.log('🔌I am an EU plug🔌');
  }
}

class UKEUOneWayPlugAdapter implements IUKEUOneWayPlugAdapter {
  constructor(private adaptee: IEUPlug) {}
  getEUPlug(): void {
    console.log('I am in UKEUOneWayPlugAdapter concrete implementation');
    this.adaptee.getEUPlug();
  }
}

class EUUKOneWayPlugAdapter implements IEUUKOneWayPlugAdapter {
  constructor(private adaptee: IUKPlug) {}
  getUKPlug(): void {
    console.log('I am in EUUKOneWayPlugAdapter concrete implementation');
    this.adaptee.getUKPlug();
  }
}

class UKEUTowWayPlugAdapter implements IUKEUTowWayPlugAdapter {
  constructor(private ukAdaptee: IUKPlug, private euAdaptee: IEUPlug) {}
  getUKPlug(): void {
    console.log('I am in UK concrete implementation of UKEUTowWayPlugAdapter');

    this.ukAdaptee.getUKPlug();
  }
  getEUPlug(): void {
    console.log('I am in EU concrete implementation of UKEUTowWayPlugAdapter');
    this.euAdaptee.getEUPlug();
  }
}

/**
 * Client/Consumer Code
 */

const myUKPlug = new UKPlug();
const myEUPlug = new EUPlug();

const myUKEUOneWayPlugAdapter = new UKEUOneWayPlugAdapter(myEUPlug);
const myEUUKOneWayPlugAdapter = new EUUKOneWayPlugAdapter(myUKPlug);
const myUKEUTwoWayAdapter = new UKEUTowWayPlugAdapter(myUKPlug, myEUPlug);

// myUKEUOneWayPlugAdapter.getEUPlug();
// myEUUKOneWayPlugAdapter.getUKPlug();

// myUKEUTwoWayAdapter.getUKPlug();
// myUKEUTwoWayAdapter.getEUPlug();
