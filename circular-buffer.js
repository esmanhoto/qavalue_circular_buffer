class CircularBuffer {
  constructor(size) {
    this.buffer = [];
    this.size = size;
    this.indexOld = 0;
    this.indexNew = -1;
  }

  write() {
    throw new Error("Remove this statement and implement this function");
  }

  read() {
    if (this.buffer.length === 0) {
      throw new BufferEmptyError();
    }

    return this.buffer[this.indexNew];
  }

  forceWrite() {
    throw new Error("Remove this statement and implement this function");
  }

  clear() {
    throw new Error("Remove this statement and implement this function");
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
