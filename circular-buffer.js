class CircularBuffer {
  constructor(size) {
    this.buffer = [];
    this.size = size;
    this.indexOld = 0;
    this.indexNew = -1;
  }

  write(element) {
    if (this.buffer.length < this.size && this.indexNew - 1 < this.indexOld) {
      this.indexOld = (this.indexOld + 1) % this.size;
    }
    if (this.buffer.length < this.size) {
      this.indexNew = (this.indexNew + 1) % this.size;
      // if (this.indexNew - 1 > this.indexOld) {
      //   this.indexOld++;
      // }
      this.buffer.splice(this.indexNew, 0, element);
    } else {
      throw new BufferFullError();
    }
  }

  read() {
    if (this.buffer.length === 0) {
      throw new BufferEmptyError();
    }

    return this.buffer[this.indexNew];
  }

  forceWrite(element) {
    this.buffer[this.indexOld] = element;
    this.indexOld = (this.indexOld + 1) % this.size;
    this.indexNew = (this.indexNew + 1) % this.size;
  }

  clear() {
    this.buffer.splice(this.indexOld, 1);
    // this.buffer[this.indexOld] = "";
    // this.indexOld++;
    if (this.indexOld < this.indexNew) {
      this.indexNew = this.indexNew - 1;
    } else {
      this.indexOld = this.indexOld % this.buffer.length;
    }
  }
}

export default CircularBuffer;

export class BufferFullError extends Error {
  constructor() {
    super("Buffer full");
  }
}

export class BufferEmptyError extends Error {
  constructor() {
    super("Buffer empty");
  }
}
