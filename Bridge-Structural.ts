/**
 * Bridge Design Pattern
 *
 * Intent: Lets you split a large class or a set of closely related classes into
 * two separate hierarchies—abstraction and implementation—which can be
 * developed independently of each other.
 */

/**
 * Interfaces
 */

interface IRemote {
  togglePower(): void;
  volumeDown(): void;
  volumeUp(): void;
  channelDown(): void;
  channelUp(): void;
  mute(): void;
}

interface IDevice {
  isEnabled(): boolean;
  enable(): void;
  disable(): void;
  getVolume(): number;
  setVolume(volume: number): void;
  getChannel(): number;
  setChannel(channel: number): void;
}

/**
 * Concrete Implementations
 */

class Remote implements IRemote {
  constructor(private device: IDevice) {}

  togglePower(): void {
    let isDeviceEnabled = this.device.isEnabled();
    let deviceStatus = isDeviceEnabled ? 'on' : 'off';
    console.log(`🎛 Remote has checked the device and it is ${deviceStatus}`);

    if (isDeviceEnabled) this.device.disable();
    if (!isDeviceEnabled) this.device.enable();

    isDeviceEnabled = this.device.isEnabled();
    deviceStatus = isDeviceEnabled ? 'on' : 'off';
    console.log(`🎛 Remote turned the device ${deviceStatus}`);
  }
  volumeDown(): void {
    let currentVolume = this.device.getVolume();
    if (currentVolume > 0) {
      this.device.setVolume(--currentVolume);
      console.log(
        `🎛 Remote turned the volume down to ${this.device.getVolume()}`
      );
    }
  }
  volumeUp(): void {
    let currentVolume = this.device.getVolume();
    if (currentVolume < 100) {
      this.device.setVolume(++currentVolume);
      console.log(
        `🎛 Remote turned the volume up to ${this.device.getVolume()}`
      );
    }
  }
  channelDown(): void {
    let currentChannel = this.device.getChannel();
    if (currentChannel > 0) {
      this.device.setChannel(--currentChannel);
      console.log(
        `🎛 Remote turned the channel down to ${this.device.getChannel()}`
      );
    }
  }
  channelUp(): void {
    let currentChannel = this.device.getChannel();
    if (currentChannel < 100) {
      this.device.setChannel(++currentChannel);
      console.log(
        `🎛 Remote turned the channel up to ${this.device.getChannel()}`
      );
    }
  }
  mute(): void {
    console.log('🎛 Remote set the volume to 0 (mute)');
    this.device.setVolume(0);
  }
}

class Radio implements IDevice {
  private enabled: boolean = false;
  private volume: number = 0;
  private channel: number = 0;

  isEnabled(): boolean {
    return this.enabled;
  }
  enable(): void {
    if (!this.isEnabled()) this.enabled = true;
  }
  disable(): void {
    if (this.isEnabled()) this.enabled = false;
  }
  getVolume(): number {
    return this.volume;
  }
  setVolume(volume: number): void {
    this.volume = volume;
  }
  getChannel(): number {
    return this.channel;
  }
  setChannel(channel: number): void {
    this.channel = channel;
  }
}

class TV implements IDevice {
  private enabled: boolean = false;
  private volume: number = 0;
  private channel: number = 0;
  isEnabled(): boolean {
    return this.enabled;
  }
  enable(): void {
    if (!this.isEnabled()) this.enabled = true;
  }
  disable(): void {
    if (this.isEnabled()) this.enabled = false;
  }
  getVolume(): number {
    return this.volume;
  }
  setVolume(volume: number): void {
    this.volume = volume;
  }
  getChannel(): number {
    return this.channel;
  }
  setChannel(channel: number): void {
    this.channel = channel;
  }
}

/**
 * Client/Consumer Code
 */

const myRadio = new Radio();
const myTV = new TV();

const myRadioRemote = new Remote(myRadio);
const myTVRemote = new Remote(myTV);

// myRadioRemote.volumeUp();
// myRadioRemote.volumeUp();
// myRadioRemote.volumeUp();
// myRadioRemote.volumeUp();
// myRadioRemote.volumeDown();
// myRadioRemote.volumeDown();
// myRadioRemote.volumeDown();

// myRadioRemote.togglePower();
// myRadioRemote.togglePower();
// myRadioRemote.togglePower();
// myRadioRemote.togglePower();
// myRadioRemote.togglePower();

// myRadioRemote.channelUp();
// myRadioRemote.channelUp();
// myRadioRemote.channelUp();
// myRadioRemote.channelUp();
// myRadioRemote.channelUp();
// myRadioRemote.channelDown();
// myRadioRemote.channelDown();

// myTVRemote.volumeUp();
// myTVRemote.volumeUp();
// myTVRemote.volumeUp();
// myTVRemote.volumeUp();
// myTVRemote.mute();

// myTVRemote.togglePower();
// myTVRemote.togglePower();
// myTVRemote.togglePower();
// myTVRemote.volumeUp();
// myTVRemote.volumeUp();
// myTVRemote.mute();
// myTVRemote.volumeUp();
